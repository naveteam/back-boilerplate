export const stringGenerator = (length = 8) => {
  const stringPossible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  return Array.from({ length }).reduce(
    acc =>
      acc +
      stringPossible.charAt(Math.floor(Math.random() * stringPossible.length)),
    ''
  )
}

export const emailGenerator = (length = 5) => {
  const string = stringGenerator(length)
  const domain = stringGenerator(5)

  return `${string}@${domain}.com`
}
