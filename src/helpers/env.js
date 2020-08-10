import path from 'path'
import dotenv from 'dotenv'

const rootDirectory = path.resolve(__dirname, '..', '..')

dotenv.config({ path: path.resolve(rootDirectory, '.env') })

/**
 * Get environment variable from process.env
 * @param {string} key The key of the environment variable
 * @param {*} defaultValue A default value if the environment variable
 * is not found
 *
 * @throws {Error} Will throw an error if the key not found in process.env
 * and no default value is received
 *
 * @returns {*} The variable value or the defaultValue
 */
export const env = (key, defaultValue) => {
  if (!defaultValue && !process.env[key]) {
    throw Error(
      `Environment variable ${key} not defined and no default value was received`
    )
  }

  return process.env[key] || defaultValue
}

/**
 * Node environment
 * @constant {string}
 */
export const NODE_ENV = env('NODE_ENV', 'development')

/**
 * @constant {boolean}
 */
export const IS_DEVELOPMENT = NODE_ENV === 'development'

/**
 * @constant {boolean}
 */
export const IS_PRODUCTION = NODE_ENV === 'production'

/**
 * @constant {boolean}
 */
export const IS_TEST = NODE_ENV === 'test'

/**
 * Port that the node server will run on
 * @constant {number}
 */
export const PORT = env('PORT', 3000)

/**
 * Email authenticate type used by nodemailer
 * @constant {string}
 */
export const MAIL_TYPE = env('MAIL_TYPE', 'gmail')

/**
 * List of emails allowed to use
 * @constant {string}
 */
export const ALLOW_LIST = env('ALLOW_LIST', JSON.stringify(['@nave.rs']))

export default env
