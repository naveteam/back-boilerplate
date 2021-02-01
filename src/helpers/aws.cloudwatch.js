import winston from 'winston'
import WinstonCloudwatch from 'winston-cloudwatch'

import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } from '../config'

export const createCloudwatchTransporter = ({
  logGroupName,
  logStreamName
}) => {
  const cloudwatchConfig = {
    logGroupName,
    logStreamName,
    awsAccessKeyId: AWS_ACCESS_KEY_ID,
    awsSecretKey: AWS_SECRET_ACCESS_KEY,
    awsRegion: AWS_REGION,
    jsonMessage: true
  }

  return new WinstonCloudwatch(cloudwatchConfig)
}

export const logCloudwatch = ({ logGroupName, logStreamName, message }) => {
  winston.add(createCloudwatchTransporter({ logGroupName, logStreamName }))

  winston.error(message)
}
