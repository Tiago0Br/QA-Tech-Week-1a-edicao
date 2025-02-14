import { ConnectionOptions, Queue } from 'bullmq'

const connection: ConnectionOptions = {
  host: 'paybank-redis',
  port: 6379
}

const queueName = 'twoFactorQueue'

const queue = new Queue(queueName, { connection })
export const getTwoFactorCode = async () => {
  type TwoFactorQueueResult = {
    data: {
      code: string
    }
  }

  const jobs = (await queue.getJobs()) as TwoFactorQueueResult[]
  const firstJob = jobs.shift()

  if (!firstJob) {
    throw new Error('No job found on "twoFactorQueue"')
  }

  return firstJob.data.code
}

export const cleanJobs = async () => {
  await queue.obliterate()
}
