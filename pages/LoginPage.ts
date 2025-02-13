import { Page, expect } from '@playwright/test'

export class LoginPage {
  private page: Page
  constructor(page: Page) {
    this.page = page
  }

  async accessPage() {
    await this.page.goto('/')
  }

  async fillCpf(cpf: string) {
    await this.page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(cpf)
    await this.page.getByRole('button', { name: 'Continuar' }).click()
  }

  async fillPassword(password: string) {
    for (const number of password) {
      await this.page.getByRole('button', { name: number }).click()
    }

    await this.page.getByRole('button', { name: 'Continuar' }).click()
  }

  async fill2FACode(code: string) {
    await this.page.getByRole('textbox', { name: '000000' }).fill(code)
    await this.page.getByRole('button', { name: 'Verificar' }).click()
  }

  async errorMessageShouldBe(message: string) {
    await expect(this.page.locator('span')).toContainText(message)
  }
}
