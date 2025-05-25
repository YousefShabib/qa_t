import { Page, expect } from "@playwright/test";

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async removeItem(index: number) {
    await this.page.locator(".cart_item").nth(index).locator("button").click();
  }

  
  async proceedToCheckout() {
    await this.page.click("#checkout");
  }
}
