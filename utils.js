const getNumCommits = () => {
  const weights = [1, 1, 1, 2, 2, 3] // Number of commits, weighted by presence in list
  const [max, min] = [weights.length, 1]
  // Get random whole number between (1,6) and get index of weights[] at that number
  return weights[Math.floor(Math.random() * ((max - min) + 1)) + min]
}

export default getNumCommits
