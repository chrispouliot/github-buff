import * as fs from 'fs'

import { commitFilePath } from './constants'

export const getNumCommits = () => {
  const weights = [1, 1, 1, 2, 2, 3] // Number of commits, weighted by presence in list
  const [min, max] = [1, weights.length]
  // Get random whole number between (min, max) and get index of weights[] at that number
  return weights[Math.floor(Math.random() * ((max - min) + 1)) + min]
}

export const appendFile = async (text) => {
  await fs.appendFile(commitFilePath, text)
}
