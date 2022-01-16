import AWS from 'aws-sdk'
import fs from 'fs'
import mime from 'mime'
import { resolve } from 'path'

import upload from '@config/upload'

import { IStorageProvider } from '../IStorageProvider'

class S3StorageProvider implements IStorageProvider {
  private client: AWS.S3

  constructor() {
    this.client = new AWS.S3({
      region: process.env.AWS_BUCKET_REGION
    })
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file)

    const fileContent = await fs.promises.readFile(originalName)

    const ContentType = mime.getType(originalName)

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
        Key: file
      })
      .promise()

    await fs.promises.unlink(originalName)

    return file
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client.deleteObject({ Bucket: `${process.env.AWS_BUCKET}/${folder}`, Key: file }).promise()
  }
}

export { S3StorageProvider }