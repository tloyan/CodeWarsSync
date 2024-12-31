import { FileToCommit } from '../src/FileToCommit'

describe('FileToCommit', () => {
  it('should return the correct extension for a given language', () => {
    const ftc = new FileToCommit({} as any, [])
    expect(ftc.getExtention('javascript')).toBe('js')
    expect(ftc.getExtention('typescript')).toBe('ts')
    expect(ftc.getExtention('python')).toBe('py')
    expect(ftc.getExtention('ruby')).toBe('rb')
    expect(ftc.getExtention('java')).toBe('java')
  })
})