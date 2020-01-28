import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import { env } from './env'

export default async (sendTo, template) => {
  const oAuth2Client = new google.auth.OAuth2(
    env('CLIENT_ID'),
    env('CLIENT_SECRET'),
    'https://developers.google.com/oauthplayground'
  )

  oAuth2Client.setCredentials({
    refresh_token: env('REFRESH_TOKEN')
  })

  const accessToken = oAuth2Client.getAccessToken()

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: env('SENDER_EMAIL'),
      pass: env('SENDER_EMAIL_PASSWORD'),
      clientId: env('CLIENT_ID'),
      clientSecret: env('CLIENT_SECRET'),
      refreshToken: env('REFRESH_TOKEN'),
      accessToken: accessToken
    }
  })
  const mailOptions = {
    from: env('SENDER_EMAIL'),
    to: sendTo,
    subject: template.subject,
    text: template.text,
    html: template.html
  }

  await transporter.sendMail(mailOptions)
}
