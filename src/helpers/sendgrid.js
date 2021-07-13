import sgMail from '@sendgrid/mail'

import { env } from './env'

export const sendEmailGrid = async (sendTo, emailBody) => {
  sgMail.setApiKey(env('SENDGRID_API_KEY'))

  const mailOptions = {
    from: env('SENDER_EMAIL'),
    to: sendTo,
    subject: emailBody.subject,
    text: emailBody.text,
    html: emailBody.html
  }

  try {
    return sgMail.send(mailOptions);
  } catch (error) {
    return error
  }
}
