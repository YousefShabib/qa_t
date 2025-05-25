import { Page, expect } from "@playwright/test";

export class InventoryPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addItemToCart(index: number) {
    await this.page.locator(".btn_inventory").nth(index).click();
  }

  async removeItemFromCart(index: number) {
    await this.page.locator(".btn_inventory").nth(index).click();
  }

  async getCartCount() {
    const badge = this.page.locator('.shopping_cart_badge');
    if (await badge.count() > 0) {
      return parseInt((await badge.textContent()) || "0");
    }
    return 0;
  }

  async sortProducts(option: "az" | "za" | "lohi" | "hilo") {
    await this.page.selectOption(".product_sort_container", option);
  }

  async getProductNames() {
    return this.page.locator(".inventory_item_name").allTextContents();
  }

  async getProductPrices() {
    const prices = await this.page
      .locator(".inventory_item_price")
      .allTextContents();
    return prices.map((p) => parseFloat(p.replace("$", "")));
  }

  async goToCart() {
    await this.page.click(".shopping_cart_link");
  }
}
