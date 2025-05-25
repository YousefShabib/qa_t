import { expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export class LoginPage {
  constructor(private page) {}

  async login(username: string, password: string) {
    await this.page.goto(process.env.BASE_URL);

    await this.page.locator('[data-test="username"]').fill(username);
    await this.page.locator('[data-test="password"]').fill(password);
    
    await this.page.click("#login-button");
        //await this.page.pause(); // ← يوقف التشغيل ويبقي المتصفح مفتوح

  }
  async isLoggedIn() {
    await expect(this.page).toHaveURL(/\/inventory/);
  }
  async expectErrorMessage(message: string) {
    await expect(this.page.locator('[data-test="error"]')).toHaveText(message);
  }
}
