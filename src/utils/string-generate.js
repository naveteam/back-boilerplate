export const stringGenerator = (lenght = 8) => {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < lenght; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

export const emailGenerator = (lenght = 5) => {
  const string = stringGenerator(lenght)
  const domain = stringGenerator(5)

  return `${string}@${domain}.com`
}
