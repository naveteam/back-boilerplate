import { NODE_ENV } from 'config'

export const LOGGER_GROUP = `banco-abc-${NODE_ENV}`

export const LOGGER_STREAM_GENERAL = `banco-abc-${NODE_ENV}-stream`

export const LOGGER_JOB_FAILED = `banco-abc-${NODE_ENV}-job-failed`

export const LOGGER_JOB_ERROR = `banco-abc-${NODE_ENV}-job-error`
