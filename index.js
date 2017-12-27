import * as fs from 'fs'

import installGit from 'lambda-git'
import simpleGit from 'simple-git/promise'
import path from 'path'

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
    console.log('Making repoPath dir..')
    await fs.mkdir(repoPath)
    console.log('Init simple git..')
    const git = await simpleGit(repoPath)
    console.log('Cloning..')
    await git.clone(repoURLWithToken, repoPath)
    console.log('Appending to file..')
    await fs.appendFile(commitFilePath, '!')
    console.log('Git add..')
    await git.add('./*')
    console.log('Git commit..')
    await git.raw([
      '-c',
      'user.name=\'Christophe Pouliot\'',
      '-c',
      'user.email=\'cristophepoug@gmail.com\'',
      'commit',
      '-m',
      '\'Github buff commit\'',
    ])
    console.log('Git push..')
    await git.push(['origin', 'master'])
    context.succeed()
  } catch (e) {
    context.fail(e)
  }
}

exports.handler = handler

