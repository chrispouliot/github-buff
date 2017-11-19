import installGit from 'lambda-git'

installGit() // Install Git for our process

exports.handler = (event, context) => {
  console.log(event)
  context.succeed('yep')
}

