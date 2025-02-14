import 'dotenv/config'
import pgPromise from 'pg-promise'

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env
const pgp = pgPromise()
const db = pgp(`postgresql://${DB_USER}:${DB_PASSWORD}@paybank-db:5432/${DB_NAME}`)

export async function get2FACode(cpf: string) {
  type TwoFactorCodeResult = {
    code: string
  }

  const query = `
    SELECT tfc.code
    FROM public."TwoFactorCode" tfc
    INNER JOIN public."User" u
    ON tfc."userId" = u.id
    WHERE u.cpf = '${cpf}'
    ORDER BY tfc.id DESC
    LIMIT 1;
  `

  const result = (await db.query(query)) as TwoFactorCodeResult[]

  return result[0].code
}
