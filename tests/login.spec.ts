import { test } from '@playwright/test'
import { LoginPage, DashPage } from '../pages'
import { getTwoFactorCode, cleanJobs } from '../support/redis'

let loginPage: LoginPage
let dashPage: DashPage

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  dashPage = new DashPage(page)

  await loginPage.accessPage()
})

test('should not login if the code is invalid', async () => {
  const user = {
    cpf: '00000014141',
    password: '147258'
  }

  await loginPage.fillCpf(user.cpf)
  await loginPage.fillPassword(user.password)
  await loginPage.fill2FACode('123456')

  await loginPage.errorMessageShouldBe('Código inválido. Por favor, tente novamente.')
})

test('should login if the code is valid', async () => {
  const user = {
    cpf: '00000014141',
    password: '147258'
  }

  await cleanJobs()

  await loginPage.fillCpf(user.cpf)
  await loginPage.fillPassword(user.password)
  await loginPage.waitFor2FACode()

  const code = await getTwoFactorCode()

  await loginPage.fill2FACode(code)
  await dashPage.dashboardShouldBeVisible()
})
