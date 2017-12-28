import * as fs from 'fs'

import installGit from 'lambda-git'
import simpleGit from 'simple-git/promise'

import { authorEmail, authorName, repoPath, repoURLWithToken } from './constants'

let _git = null
const getGit = async () => {
  if (!_git) {
    _git = await simpleGit(repoPath)
  }
  return _git
}

export const setupGit = async () => {
  await installGit()
  await fs.mkdir(repoPath)
  const git = await getGit()
  await git.clone(repoURLWithToken, repoPath)
}

export const push = async (remote, branch) => {
  const git = await getGit()
  await git.push(remote, branch)
}

export const add = async () => {
  const git = await getGit()
  return git.add('./*')
}

export const commitAndAuthor = async () => {
  const git = await getGit()
  await git.raw([
    '-c',
    `user.name='${authorName}'`,
    '-c',
    `user.email='${authorEmail}'`,
    'commit',
    '-m',
    `Gitub buff commit ${new Date().getTime()}`,
  ])
}
