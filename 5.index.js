const { Builder, By, until } = require('selenium-webdriver');
const path = require('path');

async function testLogin() {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    const fileUrl = 'file://' + path.resolve('login.html'); // Local file path

    await driver.get(fileUrl);

    // Fill in username and password
    const usernameInput = await driver.findElement(By.id('username'));
    const passwordInput = await driver.findElement(By.id('password'));

    await usernameInput.sendKeys('admin');
    await driver.sleep(1000); // optional pause

    await passwordInput.sendKeys('1234');
    await driver.sleep(1000); // optional pause

    // Submit the form
    await driver.findElement(By.css('input[type="submit"]')).click();

    // Wait for the result message
    const messageElem = await driver.wait(until.elementLocated(By.id('message')), 5000);
    const message = await messageElem.getText();

    console.log("\nLogin Result:", message);
    await driver.sleep(5000); // See result
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await driver.quit();
  }
}

testLogin();
