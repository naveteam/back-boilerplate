import { NODE_ENV, LOGGER_NAME } from 'config'

export const LOGGER_GROUP = `${LOGGER_NAME}-${NODE_ENV}`

export const LOGGER_STREAM_GENERAL = `${LOGGER_NAME}-${NODE_ENV}-stream`

export const LOGGER_JOB_FAILED = `${LOGGER_NAME}-${NODE_ENV}-job-failed`

export const LOGGER_JOB_ERROR = `${LOGGER_NAME}-${NODE_ENV}-job-error`
