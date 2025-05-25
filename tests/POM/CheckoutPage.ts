import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillShippingInfo(
    firstName: string,
    lastName: string,
    postalCode: string
  
  ) {
    await this.page.fill("#first-name", firstName);
    await this.page.fill("#last-name", lastName);
    await this.page.fill("#postal-code", postalCode);
    await this.page.click("#continue");
  }

  async finishCheckout() {
    await this.page.click("#finish");
  }

  async expectOrderComplete() {
    await expect(this.page.locator(".complete-header")).toHaveText(
      "Thank you for your order!"
    );
  }

  
  async expectErrorMessage() {
    await expect(this.page.locator('[data-test="error"]')).toBeVisible();
  }
}
