import dotenv from "dotenv";
dotenv.config();

import { Octokit } from "octokit";

const octokit = new Octokit({ auth: process.env.GITHUB_PASSKEY })

export class Repository {
  private baseCommitSha: string | undefined = undefined
  private baseTreeSha: string | undefined = undefined
  private files: object[] = []

  constructor(private username: string, private repoName: string) { }

  async init() {
    const { data: refData } = await octokit.rest.git.getRef({
      owner: this.username,
      repo: this.repoName,
      ref: "heads/main"
    })
    this.baseCommitSha = refData.object.sha
    console.log("Base Commit SHA:", this.baseCommitSha);

    const { data: commitData } = await octokit.rest.git.getCommit({
      owner: this.username,
      repo: this.repoName,
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
      owner: this.username,
      repo: this.repoName,
      base_tree: this.baseTreeSha,
      tree: this.files
    })

    console.log("New Tree SHA:", newTree.sha);

    const { data: newCommit } = await octokit.rest.git.createCommit({
      owner: this.username,
      repo: this.repoName,
      message: message,
      tree: newTree.sha,
      parents: this.baseCommitSha ? [this.baseCommitSha] : []
    })

    this.baseCommitSha = newCommit.sha
    this.baseTreeSha = newTree.sha

    this.files = []
  }

  async push() {
    if (this.baseCommitSha) {
      await octokit.rest.git.updateRef({
        owner: this.username,
        repo: this.repoName,
        ref: `heads/main`,
        sha: this.baseCommitSha
      })
    }
  }

  async getFile(path: string): Promise<string> {
    try {
      const { data: fileData } = await octokit.rest.repos.getContent({
        owner: this.username,
        repo: this.repoName,
        path: path,
        ref: `heads/main`
      })
      if ("content" in fileData) {
        return Buffer.from(fileData.content, 'base64').toString('utf8')
      }
      throw new Error('Could not read file content')
    } catch (error) {
      throw new Error('Not Found')
    }
  }

  async createRepo() {
    const { data: repoData } = await octokit.rest.repos.createForAuthenticatedUser({
      name: process.env.GITHUB_REPO_NAME,
    });

    console.log(repoData)
  }
}