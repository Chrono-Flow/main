const puppet = require("puppeteer-core")

    (async () => {

        const browser = await puppet.launch({ headless: false });
        const page = await browser.newPage();

        // Mock data for login
        const username = "mock_username";
        const password = "mock_password";

        try {
            // Navigate to Instagram login page
            await page.goto("https://www.instagram.com/accounts/login/", { waitUntil: "networkidle2" });

            // Wait for the username and password fields to load
            await page.waitForSelector("input[name='username']");
            await page.waitForSelector("input[name='password']");

            // Enter the mock username and password
            await page.type("input[name='username']", username, { delay: 100 });
            await page.type("input[name='password']", password, { delay: 100 });

            // Click the login button
            await page.click("button[type='submit']");

            // Wait for navigation or error message
            await page.waitForTimeout(5000);

            // Take a screenshot after attempting login
            await page.screenshot({ path: "/home/ashish/Desktop/v2/extensions/screenshots/insta-login.png" });
        } catch (error) {
            console.error("Error during Instagram login simulation:", error);
        } finally {
            await browser.close();
        }
    })();