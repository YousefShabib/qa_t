import { test, expect } from '@playwright/test';
import { InventoryPage } from './POM/InventoryPage';
import { LoginPage } from './POM/LoginPage';

test.describe('Add to Cart', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
    inventoryPage = new InventoryPage(page);
  });

  test('Add Single Item', async () => {
    await inventoryPage.addItemToCart(0);
    expect(await inventoryPage.getCartCount()).toBe(1);
  });

  test('Add Multiple Items', async () => {
    await inventoryPage.addItemToCart(0);
    await inventoryPage.addItemToCart(1);
    expect(await inventoryPage.getCartCount()).toBe(2);
  });
});