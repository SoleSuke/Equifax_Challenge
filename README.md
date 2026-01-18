# Equifax code challenge

[Soledad Fuica](mailto:soledad.fuica[at]gmail.com)
2026-01-18

## DISCLAIMER

This is my first time using Playwright as a testing framework and my first time programming in Typescript, so it is very likely that the code is not as efficient as it should be.


## Instruction to use code contained in this repository 

### Prerequisites
* Unzip this directory.zip and select the path
* Change the working directory to the project path: cd <your_path>
* You must have Node.js 22+ installed in your system

### Instructions

1. Install npm packages: playwright, dotenv
```bash
npm init playwright@latest
npm install dotenv --save-dev
```
2. Obtain your API_ACCESS_TOKEN 
    1. Go to https://themoviedb.org
    1. Create an account
        1. Select "Login" from the top left menu
        1. Click on the first paragraph: "Click here"
        1. Fill the Sign up (choose an username and password, and give an existing email) form and click in "Sign up" and follow the instructions.
        1. Go to your email account and check for the email verification that themoviedb sent you and click in "ACTIVATE MY ACCOUNT".
        1. Go back to the site main page and click in "Login" and enter your username and password.
        1. Select "More" ==> "API Documentation" from the top central menu
        1. In the second paragraph click in the link "API Link".
        1. Answer "Yes" to the question "Is the intended use of our API for personal use?"
        1. Fill the Developer Plan Form with your information
        1. Check the box "I understand and agree to the Terms of Use, Privacy Policy, and Notice of Collection."
        1. Click in the "Subscribe" button (below).
        1. The page will redirigate to a new page. Click on "Access your API key details here."
        1. Copy your "API Read Access Token"
        1. Copy the file .env_example with the name .env
        1. Copy your "API Read Access Token" in the place of your_access_token
3. Run the tests
   1. By default the tests will run in Chrome, Firefox and Safari Desktop, but you could select adding to the command line "--project=chromium" for Chrome,"--project=firefox" for Firefox and "--project=webkit" for Safari
       * For more details and options check playwright.config.ts
   1. To run all the tests execute:
```npx playwright test```
   1. If you want to run only one of the suite tests execute, check the name under tests/api:
```bash
npx playwright test movie.catalog.spec.ts #To run tests for movie endpoint
npx playwright test serie.catalog.spec.ts #To run tests for tv series endpoint
npx playwright test search.spec.ts #To run tests for search endpoint
```
5. Check the Report 
```npx playwright show-report```
