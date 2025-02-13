import { expect, Page } from '@playwright/test'

export class DashPage {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  async dashboardShouldBeVisible() {
    await expect(this.page.locator('h2', { hasText: 'Saldo disponível' })).toBeVisible({
      timeout: 5000
    })
  }
}
