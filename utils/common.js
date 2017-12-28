import * as fs from 'fs'

import { commitFilePath } from './constants'

export const getNumCommits = () => {
  const weights = [1, 1, 1, 2, 2, 3] // Number of commits, weighted by presence in list
  const [min, max] = [1, weights.length]
  // Get random whole number between (min, max) and get index of weights[] at that number
  return weights[Math.floor(Math.random() * ((max - min) + 1)) + min]
}

export const writeFile = async () => {
  // Write random text to file. Replace old file.
  const randomText = Math.random().toString(36).substring(7)
  await fs.writeFile(commitFilePath, randomText)
}
