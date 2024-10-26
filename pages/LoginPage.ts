import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly getTestAccount: Locator;
  readonly login: Locator;

  constructor(page: Page) {
    this.page = page;
    this.login = page.locator("#login-btn");
    this.getTestAccount = page.getByText("Get a test account");
  }

  async loginWithTestAccount() {
    await this.getTestAccount.waitFor({ state: "visible" });
    await this.getTestAccount.click();
    await expect(this.page.getByText("Generate success.")).toBeVisible();
    await this.login.click();
  }
}
