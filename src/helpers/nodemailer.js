import { env, NODE_ENV, MAIL_TYPE, ALLOW_LIST } from './env'

import { createTransporter } from './email-transporter'

const DOMAIN_REGEX = /@.{2,}\..{1,}/

export const sendEmail = (sendTo, emailBody) => {
  if (NODE_ENV !== 'production') {
    try {
      const allowList = JSON.parse(ALLOW_LIST)

      if (
        allowList.length === 0 ||
        allowList.find(domain => !DOMAIN_REGEX.test(domain))
      ) {
        return
      }

      const isAllowed = allowList.find(domain => sendTo.includes(domain))

      if (!isAllowed) {
        return
      }
    } catch {
      return
    }
  }

  const transporter = createTransporter(MAIL_TYPE)

  const mailOptions = {
    from: env('SENDER_EMAIL'),
    to: sendTo,
    subject: emailBody.subject,
    text: emailBody.text,
    html: emailBody.html
  }

  return transporter.sendMail(mailOptions)
}
