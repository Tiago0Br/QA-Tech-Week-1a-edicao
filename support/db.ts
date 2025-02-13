import 'dotenv/config'
import pgPromise from 'pg-promise'

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env
const pgp = pgPromise()
const db = pgp(`postgresql://${DB_USER}:${DB_PASSWORD}@paybank-db:5432/${DB_NAME}`)

export async function get2FACode() {
  type TwoFactorCodeResult = {
    code: string
  }

  const query = `
    SELECT code
    FROM public."TwoFactorCode"
    ORDER BY id DESC
    LIMIT 1;
  `

  const result = (await db.query(query)) as TwoFactorCodeResult[]

  return result[0].code
}
