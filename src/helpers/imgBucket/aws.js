import {
  S3_BUCKET,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION
} from '../config/env'
import aws from 'aws-sdk'
import fs from 'fs'
import { writeFile, fileToBlob } from '.'

export const initAws = () =>
  new aws.S3({
    signatureVersion: 'v4',
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  })

export const uploadAWS = async (filename, file) =>
  new Promise(async (resolve, reject) => {
    const s3 = initAws()
    const blob = await fileToBlob(file)
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: filename,
      Body: blob,
      ContentType: file.type
    }

    s3.upload(s3Params, (err, data) => {
      if (err) {
        return reject(err)
      }

      return resolve(data)
    })
  })

export const getAwsFile = async filename => {
  const s3 = initAws()
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: filename
  }

  const file = fs.createWriteStream(filename)

  await s3
    .getObject(s3Params)
    .createReadStream()
    .pipe(file)

  return writeFile(file)
}
