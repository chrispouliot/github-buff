import installGit from 'lambda-git'
import simpleGit from 'simple-git'
import path from 'path'

// CONFIG
const git = simpleGit(path.join(__dirname, 'tmp')).silent(true)
const _rawRepoUrl = process.env.REPO_URL
const _githubToken = process.env.GITHUB_TOKEN
// Turn https://github.com/... to https://token@github.com/...
const repoURL = _rawRepoUrl.replace('github.com', `${_githubToken}@github.com`)

// Install Git for our process
// installGit()`

async function handler(event, context) {
  try {
    await git.clone(repoURL)
  } catch (e) {
    console.log(e)
  }
}

export default handler

