import { Page, Locator } from "@playwright/test";

export class IntroPage {
  readonly page: Page;
  readonly connectButton: Locator;
  readonly loginPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = page
      .getByRole("navigation")
      .getByRole("link", { name: "Login" });
  }

  async goToLogin() {
    await this.page.goto("http://127.0.0.1:5000/");
    await this.loginPage.waitFor({ state: "visible" });
    await this.loginPage.click();
  }
}
