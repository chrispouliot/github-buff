import { writeFile, getNumCommits } from './utils/common'
import { add, commitAndAuthor, setupGit, push } from './utils/git'

async function handler(event, context) {
  try {
    await setupGit()
    const numCommits = getNumCommits()
    for (let numCommit = 1; numCommit <= numCommits; numCommit += 1) {
      await writeFile()
      await add()
      await commitAndAuthor()
    }
    await push('origin', 'master')
    context.succeed()
  } catch (e) {
    context.fail(e)
  }
}

exports.handler = handler

