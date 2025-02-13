import pgPromise from 'pg-promise'

const pgp = pgPromise()
const db = pgp('postgresql://dba:dba@paybank-db:5432/UserDB')

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
