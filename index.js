import * as fs from 'fs'

import installGit from 'lambda-git'
import simpleGit from 'simple-git'
import path from 'path'

// CONFIG
const _rawRepoUrl = process.env.REPO_URL
const _githubToken = process.env.GITHUB_TOKEN
const _repoName = process.env.REPO_NAME
const _commitFile = process.env.COMMIT_FILE

const repoPath = path.join(__dirname, _repoName)
const commitFilePath = path.join(repoPath, _commitFile)
const repoURLWithToken = _rawRepoUrl.replace('github.com', `${_githubToken}@github.com`)

// setup Git for our process
installGit()
fs.mkdirSync(repoPath)
const git = simpleGit(repoPath).silent(true)

async function handler(event, context) {
  try {
    await git.clone(repoURLWithToken, repoPath)
    await fs.appendFile(commitFilePath, '!')
    await git.add('./*')
    await git.commit('Github buff commit')
    await git.push(['origin', 'master'])
  } catch (e) {
    context.fail(e)
  }
  context.succeed()
}

export default handler

