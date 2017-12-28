import * as fs from 'fs'

import installGit from 'lambda-git'
import simpleGit from 'simple-git/promise'
import path from 'path'

import getNumCommits from './utils'

// CONFIG
const _rawRepoUrl = process.env.REPO_URL
const _githubToken = process.env.GITHUB_TOKEN
const _repoName = process.env.REPO_NAME
const _commitFile = process.env.COMMIT_FILE

const repoPath = path.join('/tmp', _repoName)
const commitFilePath = path.join(repoPath, _commitFile)
const repoURLWithToken = _rawRepoUrl.replace('github.com', `${_githubToken}@github.com`)

async function handler(event, context) {
  try {
    await installGit()
    await fs.mkdir(repoPath)
    const git = await simpleGit(repoPath)
    await git.clone(repoURLWithToken, repoPath)
    const numCommits = getNumCommits()
    for (let numCommit = 1; numCommit <= numCommits; numCommit += 1) {
      await fs.appendFile(commitFilePath, '!')
      await git.add('./*')
      await git.raw([
        '-c',
        `user.name=${'Christophe Pouliot'}`,
        '-c',
        `user.email=${'cristophepoug@gmail.com'}`,
        'commit',
        '-m',
        `Gitub buff commit #${numCommit}`,
      ])
    }
    await git.push(['origin', 'master'])
    context.succeed()
  } catch (e) {
    context.fail(e)
  }
}

exports.handler = handler

