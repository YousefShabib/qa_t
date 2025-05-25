import { test, expect } from "@playwright/test";
import { InventoryPage } from "./POM/InventoryPage";
import { CartPage } from "./POM/CartPage";
import { CheckoutPage } from "./POM/CheckoutPage";
import { LoginPage } from "./POM/LoginPage";

test.describe("Checkout Process", () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
  });
  test("Complete Checkout", async ({ page }) => {
    await inventoryPage.addItemToCart(0);
    await inventoryPage.goToCart(); 
    await cartPage.proceedToCheckout();
    
    await checkoutPage.fillShippingInfo("Yousef", "Shabib", "P440");
    await checkoutPage.finishCheckout();
    await checkoutPage.expectOrderComplete();
  });
  

  test("Checkout Missing Information", async ({ page }) => {
    await inventoryPage.addItemToCart(0);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillShippingInfo("", "", "");
    await checkoutPage.expectErrorMessage();
  });
});
