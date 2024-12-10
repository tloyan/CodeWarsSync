import dotenv from "dotenv";
dotenv.config();

import { Octokit } from 'octokit'

const octokit = new Octokit({ auth: process.env.GITHUB_PASSKEY })


export class Repository {
  private baseCommitSha: string | undefined = undefined
  private baseTreeSha: string | undefined = undefined
  private newCommitSha: string | undefined = undefined
  private files: object[] = []
  
  async init() {
    const { data: refData } = await octokit.rest.git.getRef({
      owner: process.env.GITHUB_USERNAME,
      repo: process.env.GITHUB_REPO_NAME,
      ref: "heads/main"
    })
    this.baseCommitSha = refData.object.sha
    console.log("Base Commit SHA:", this.baseCommitSha);

    const { data: commitData } = await octokit.rest.git.getCommit({
      owner: process.env.GITHUB_USERNAME,
      repo: process.env.GITHUB_REPO_NAME,
      commit_sha: this.baseCommitSha,
    });
    this.baseTreeSha = commitData.tree.sha;
    console.log("Base Tree SHA:", this.baseTreeSha);
  }

  add(filename: string, content: string) {
    this.files = [...this.files, {
      path: filename,
      mode: "100644",
      type: "blob",
      content: content,
    }]
  }

  async commit(message: string) {
    if (!this.baseTreeSha) {
      throw new Error("Base tree SHA is not initialized. Call `init` first.");
    }

    const { data: newTree } = await octokit.rest.git.createTree({
      owner: process.env.GITHUB_USERNAME,
      repo: process.env.GITHUB_REPO_NAME,
      base_tree: this.baseTreeSha,
      tree: this.files
    })

    console.log("New Tree SHA:", newTree.sha);

    const { data: newCommit } = await octokit.rest.git.createCommit({
      owner: process.env.GITHUB_USERNAME,
      repo: process.env.GITHUB_REPO_NAME,
      message: message,
      tree: newTree.sha,
      parents: this.baseCommitSha ? [this.baseCommitSha] : []
    })

    this.newCommitSha = newCommit.sha
    console.log("New Commit SHA:", this.newCommitSha);
  }

  async push() {
    if (this.newCommitSha) {
      await octokit.rest.git.updateRef({
        owner: process.env.GITHUB_USERNAME,
        repo: process.env.GITHUB_REPO_NAME,
        ref: `heads/main`,
        sha: this.newCommitSha
      })
    }
  }
  getFile() {}
}