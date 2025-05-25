import { test, expect } from "@playwright/test";
import { InventoryPage } from "./POM/InventoryPage";
import { LoginPage } from "./POM/LoginPage";

test.describe("Sort Products", () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
    inventoryPage = new InventoryPage(page);
  });

  test("Sort by Name (A-Z)", async () => {
    const originalNames = await inventoryPage.getProductNames();
    await inventoryPage.sortProducts("az");
    const sortedNames = await inventoryPage.getProductNames();
    expect(sortedNames).toEqual([...originalNames].sort());
  });
  test("Sort by Name (Z-A)", async () => {
    const originalNames = await inventoryPage.getProductNames();
    await inventoryPage.sortProducts("za");
    const sortedNames = await inventoryPage.getProductNames();
    expect(sortedNames).toEqual([...originalNames].sort().reverse());
  });

  test("Sort by Price (High to Low)", async () => {
    const originalPrices = await inventoryPage.getProductPrices();
    await inventoryPage.sortProducts("hilo");
    const sortedPrices = await inventoryPage.getProductPrices();
    expect(sortedPrices).toEqual([...originalPrices].sort((a, b) => b - a));
  });
  test("Sort by Price (Low to High)", async () => {
    const originalPrices = await inventoryPage.getProductPrices();
    await inventoryPage.sortProducts("lohi");
    const sortedPrices = await inventoryPage.getProductPrices();
    expect(sortedPrices).toEqual([...originalPrices].sort((a, b) => a - b));
  });
});
