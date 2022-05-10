import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import aws from 'aws-sdk'
import fs from 'fs'
import fileType from 'file-type'

import { writeFile, fileToBlob } from 'helpers'
import {
  S3_BUCKET,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION
} from 'config'

export const initBucket = () =>
  new aws.S3({
    signatureVersion: 'v4',
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  })

const s3 = initBucket()

export const uploadImage = async (filename, file) => {
  try {
    const ext = getExtFromFileName(file.name)
    const blob = await fileToBlob(file)

    const s3Params = {
      Bucket: S3_BUCKET,
      Key: `${filename}.${ext}`,
      Body: blob,
      ContentType: file.type,
      ACL: 'public-read',
    }
    const command = new PutObjectCommand(s3Params)
    return signedUrl = await getSignedUrl(s3, command, {expiresIn: 120})

  } catch (error) {
    throw new Error(error)
  }
}

export const getExtFromFileName = filename => filename.split('.').pop() || ''

export const getImage = async filename => {

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: filename
  }

  const file = fs.createWriteStream(filename)

  const command = new GetObjectCommand(s3Params)

  await getSignedUrl(s3, command, {expiresIn: 3600})


  return writeFile(file)
}
