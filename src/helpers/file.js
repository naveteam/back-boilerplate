import fs from 'fs'
import xhr2 from 'xhr2'

global.XMLHttpRequest = xhr2

export const fileToBlob = file =>
  new Promise((resolve, reject) => {
    fs.readFile(file.path, (err, data) => {
      if (err) {
        reject(err)
      }
      fs.unlinkSync(file.path)
      resolve(data)
    })
  })

export const nameToUrl = filename => {
  const split = filename.split('.')
  const name = split.slice(0, split.length - 1).join('.')

  return `${name}_${Date.now()}.${split[split.length - 1]}`
}

export const writeFile = file =>
  new Promise((resolve, reject) => {
    file.on('error', err => reject(err)).on('finish', () => resolve(file))
  })
