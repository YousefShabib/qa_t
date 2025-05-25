import { test } from "@playwright/test";
import { LoginPage } from "./POM/LoginPage";

test.describe("login", async () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test("successful login", async ({ page }) => {
    await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
    await loginPage.isLoggedIn();
  });

  test("invalid user login", async ({ page }) => {
    await loginPage.login("not user", process.env.PASSWORD!);
    await loginPage.expectErrorMessage(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("invalid password", async ({ page }) => {
    await loginPage.login(process.env.USER_NAME!, "wrong_password");
    await loginPage.expectErrorMessage(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
});
