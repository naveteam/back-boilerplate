import { URL_FRONT } from 'config'

export const templateForgetPassword = token => {
  const resetLink = `${URL_FRONT}/reset-password/${token}`

  return {
    subject: 'Recuperação de senha',
    text: `Site para recuperar senha: ${resetLink}`,
    html: `<br>Site para recuperar senha: <a href="${resetLink}" target="_blank">${resetLink}`
  }
}
