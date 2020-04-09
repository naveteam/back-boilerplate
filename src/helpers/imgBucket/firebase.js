import firebase from 'firebase'
import 'firebase/storage'

import { fileToBlob } from 'helpers'
import { BUCKET_API_KEY, BUCKET_URL, BUCKET_STORAGE } from 'config'

export const initBucket = () => {
  const config = {
    apiKey: BUCKET_API_KEY,
    authDomain: BUCKET_URL,
    databaseURL: `https://${BUCKET_URL}`,
    storageBucket: BUCKET_STORAGE
  }

  return firebase.initializeApp(config)
}

export const getImage = name =>
  firebase.storage().ref().child(name).getDownloadURL()

export const getAllImages = images =>
  Promise.all(images.map(name => this.getImage(name)))

export const uploadImage = async (name, file) => {
  const blob = await fileToBlob(file)
  return firebase
    .storage()
    .ref()
    .child(name)
    .put(blob, { contentType: file.type })
}
