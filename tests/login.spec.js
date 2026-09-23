const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
require('dotenv').config();

test.describe('Automation Exercise - Login', () => {
  test('a registered user can log in successfully', async ({ page }) => {
    const email = process.env.TEST_EMAIL;
    const password = process.env.TEST_PASSWORD;
    const name = process.env.TEST_NAME; // optional, used for an extra name check

    test.skip(
      !email || !password,
      'Set TEST_EMAIL and TEST_PASSWORD in a ".env" file (copy .env.example) before running this test.'
    );

    const loginPage = new LoginPage(page);

    // 1. Launch the website
    await loginPage.goto();
    await expect(page).toHaveTitle(/Automation Exercise/);

    // 2. Navigate to the Login page (Home -> Signup / Login)
    await loginPage.navigateToLoginPage();
    await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible();

    // 3 Enter the registered email/password and submit the login form
    await loginPage.login(email, password);

    // 4. Verify that the login was successful:
    //    - the "Logged in as <name>" indicator appears in the navbar
    //    - "Logout" and "Delete Account" links replace "Signup / Login"
    await expect(loginPage.loggedInAsText).toBeVisible();
    await expect(loginPage.logoutLink).toBeVisible();
    await expect(loginPage.deleteAccountLink).toBeVisible();

    // Extra check: confirm the exact registered name is shown, if provided
    if (name) {
      await expect(loginPage.loggedInAsText).toContainText(name);
    }
  });
});
