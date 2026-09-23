class LoginPage {
  constructor(page) {
    this.page = page;

    // Navbar link that takes the user from Home -> Login/Signup page
    this.signupLoginNavLink = page.locator('a[href="/login"]');

    // Login form fields (automationexercise.com exposes these via data-qa attributes)
    this.emailInput = page.locator('input[data-qa="login-email"]');
    this.passwordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');

    // Shown only when the login form is submitted with wrong credentials
    this.loginErrorMessage = page.locator('p:has-text("Your email or password is incorrect!")');

    // These three only appear in the navbar AFTER a successful login
    this.loggedInAsText = page.locator('li:has-text("Logged in as")');
    this.logoutLink = page.locator('a[href="/logout"]');
    this.deleteAccountLink = page.locator('a[href="/delete_account"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async navigateToLoginPage() {
    await this.signupLoginNavLink.click();
    await this.page.waitForURL('**/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async isLoggedIn() {
    return this.loggedInAsText.isVisible();
  }

  async getLoggedInUserName() {
    const text = await this.loggedInAsText.innerText();
    return text.replace('Logged in as', '').trim();
  }
}

module.exports = { LoginPage };
