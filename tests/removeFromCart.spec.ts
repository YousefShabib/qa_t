import { test, expect } from "@playwright/test";
import { InventoryPage } from "./POM/InventoryPage";
import { LoginPage } from "./POM/LoginPage";
import { CartPage } from "./POM/CartPage";

test.describe("Remove from Cart", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
  });

  test("Remove from Inventory Page", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart(0);
    expect(await inventoryPage.getCartCount()).toBe(1);
    await inventoryPage.removeItemFromCart(0);
    expect(await inventoryPage.getCartCount()).toBe(0);
  });

  test("Remove from Cart Page", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await inventoryPage.addItemToCart(0);
    await inventoryPage.goToCart();
    await cartPage.removeItem(0);
    expect(await inventoryPage.getCartCount()).toBe(0);
  });
});
