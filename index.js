import installGit from 'lambda-git'
import NodeGit from 'nodegit'
import path from 'path'

// config
const repoUrl = process.env.REPO_URL
const githubToken = process.env.GITHUB_TOKEN
const clonePath = path.join(__dirname, 'bla')
const cloneOptions = {
  fetchOpts: {
    callbacks: {
      credentials: () => (
        NodeGit.Cred.userpassPlaintextNew(githubToken, 'x-oauth-basic')
      ),
    },
  },
}

// Install Git for our process
// installGit()

const handler = (event, context) => {
  NodeGit.Clone(
    repoUrl,
    clonePath,
    cloneOptions,
  ).then((repo) => {
    console.log("yep")
  }).catch((err) => {
    console.log(err)
  })
  context.succeed('yep')
}

export default handler

