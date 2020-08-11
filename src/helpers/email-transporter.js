import nodemailer from 'nodemailer'
import { google } from 'googleapis'

import { env } from 'helpers'

const getCredencials = type => {
  switch (type) {
    case 'Oauth2':
      const oAuth2Client = new google.auth.OAuth2(
        env('CLIENT_ID'),
        env('CLIENT_SECRET'),
        'https://developers.google.com/oauthplayground'
      )

      oAuth2Client.setCredentials({
        refresh_token: env('REFRESH_TOKEN')
      })

      const accessToken = oAuth2Client.getAccessToken()

      return {
        clientId: env('CLIENT_ID'),
        clientSecret: env('CLIENT_SECRET'),
        refreshToken: env('REFRESH_TOKEN'),
        accessToken
      }
    default:
    case 'gmail':
      return {
        user: env('SENDER_EMAIL'),
        pass: env('SENDER_EMAIL_PASSWORD')
      }
  }
}

export const createTransporter = type =>
  nodemailer.createTransport({
    service: 'Gmail',
    auth: getCredencials(type)
  })
