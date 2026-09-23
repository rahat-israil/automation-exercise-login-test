# Automation Exercise - Login Test (Playwright + JavaScript)

End-to-end automation of the Login scenario on [automationexercise.com](https://www.automationexercise.com/), built with Playwright Test and JavaScript.

## What it does

1. Launches the website (Home page).
2. Navigates to the Login page via the "Signup / Login" nav link.
3. Enters a registered email address and password.
4. Submits the login form.
5. Verifies login succeeded by checking the "Logged in as <name>" link (and Logout link) appear in the navbar.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later (includes npm)
- A **manually created account** on https://www.automationexercise.com/ (Signup / Login → New User Signup! → fill the account details form → Create Account). The automation only performs *login*, not signup - you must sign up once by hand and use those credentials.

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Install the Playwright browser binaries (one-time)
npx playwright install

```

## Running the test

```bash
npm test              # headless run
npm run test:headed   # watch the browser while it runs
npm run test:ui       # Playwright's interactive UI mode
npm run report        # open the HTML report after a run

```

## Project structure

```
automation-exercise-login-test/
├── package.json
├── playwright.config.js
├── .env.example        # copy to .env, never commit real credentials
├── pages/
│   └── LoginPage.js     # Page Object Model for the Login page
├── tests/
│   └── login.spec.js    # the login scenario
└── README.md
```

## Notes

- Selectors use `automationexercise.com`'s own `data-qa` attributes (e.g. `input[data-qa="login-email"]`), which the site provides specifically for test automation, so they're stable across UI styling changes.
- Login success is verified by checking that three navbar elements - which only appear after logging in - become visible: "Logged in as `<name>`", "Logout", and "Delete Account" (before login, the navbar shows "Signup / Login" instead).