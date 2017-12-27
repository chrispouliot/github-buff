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

function handler(event, context) {
  let git = null
  installGit()
    .then(() => {
      console.log('Making repoPath dir..')
      return fs.mkdir(repoPath)
    })
    .then(() => {
      console.log('Init simple git..')
      git = simpleGit(repoPath)
    })
    .then(() => {
      console.log('Cloning..')
      return git.clone(repoURLWithToken, repoPath)
    })
    .then(() => {
      console.log('Appending to file..')
      return fs.appendFile(commitFilePath, '!')
    })
    .then(() => {
      console.log('Git add..')
      return git.add('./*')
    })
    .then(() => {
      console.log('Git commit..')
      return git.raw([
        '-c',
        'user.name=\'Christophe Pouliot\'',
        '-c',
        'user.email=\'cristophepoug@gmail.com\'',
        'commit',
        '-m',
        '\'Github buff commit\'',

      ])
    })
    .then(() => {
      console.log('Git push..')
      return git.push(['origin', 'master'])
    })
    .then(() => context.succeed())
    .catch(e => context.fail(e))
}

exports.handler = handler

