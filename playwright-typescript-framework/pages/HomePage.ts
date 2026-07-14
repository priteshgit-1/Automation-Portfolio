import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly inventoryList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
  }

  async verifyLoaded() {
    await this.inventoryList.waitFor();
  }
}
