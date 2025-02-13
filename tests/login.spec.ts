import { test } from '@playwright/test'
import { get2FACode } from '../support/db'
import { LoginPage, DashPage } from '../pages'

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

test('should login if the code is valid', async ({ page }) => {
  const user = {
    cpf: '00000014141',
    password: '147258'
  }

  await loginPage.fillCpf(user.cpf)
  await loginPage.fillPassword(user.password)

  await page.waitForTimeout(2000)
  const code = await get2FACode()

  await loginPage.fill2FACode(code)
  await dashPage.dashboardShouldBeVisible()
})
