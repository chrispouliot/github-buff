import path from 'path'

const _rawRepoUrl = process.env.REPO_URL
const _githubToken = process.env.GITHUB_TOKEN
const _repoName = process.env.REPO_NAME
const _commitFile = process.env.COMMIT_FILE

export const repoPath = path.join('/tmp', _repoName)
export const commitFilePath = path.join(repoPath, _commitFile)
export const repoURLWithToken = _rawRepoUrl.replace('github.com', `${_githubToken}@github.com`)
