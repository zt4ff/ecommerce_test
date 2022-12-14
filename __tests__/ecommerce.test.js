const assert = require("assert");
const webdriver = require("selenium-webdriver");
const { ECommerceHomePage, page } = require("../pageobject/homepage.js");
require("dotenv").config();

const caps = require("../single.conf.js").capabilities;

const LT_USERNAME = process.env.LT_USERNAME;
const LT_ACCESS_KEY = process.env.LT_ACCESS_KEY;

const buildDriver = function (caps) {
  return new webdriver.Builder()
    .usingServer(
      `https://${LT_USERNAME}:${LT_ACCESS_KEY}@hub.lambdatest.com/wd/hub`
    )
    .withCapabilities(caps)
    .build();
};

describe("E-Commerce Sample " + caps.browserName, function () {
  let driver;
  this.timeout(0);

  beforeEach(function (done) {
    caps.name = this.currentTest.title;
    driver = buildDriver(caps);
    done();
  });

  it("can add to shopping cart", async function () {
    const page = new ECommerceHomePage(driver);
    await page.goToUrl("https://ecommerce-playground.lambdatest.io");
    await page.addMacBookToCart();
    const cartIconProductCount = await page.getCartIConTextContent();
    assert.equal(cartIconProductCount.trim(), "1");
  });

  it("should not register when username is taken", async function() {
    const page = new ECommerceHomePage(driver);
    await page.goToUrl(
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
    );
    await page.goToRegisterPage();
    await page.fillRegistrationForm();
    const accountRegistrationStatusMessage =
      await page.getAccountRegistrationSuccessTextContent();
    assert.equal(
      accountRegistrationStatusMessage.trim(),
      "Register Account"
    );
  })

  // this test would fail because an the username provide is already in use
  it("should register a new user", async function () {
    const page = new ECommerceHomePage(driver);
    await page.goToUrl(
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
    );
    await page.goToRegisterPage();
    await page.fillRegistrationForm();
    const accountRegistrationStatusMessage =
      await page.getAccountRegistrationSuccessTextContent();
    assert.equal(
      accountRegistrationStatusMessage.trim(),
      "Your Account Has Been Created!"
    );
  });

  afterEach(function (done) {
    if (this.currentTest.isPassed()) {
      driver.executeScript("lambda-status=passed");
    } else {
      driver.executeScript("lambda-status=failed");
    }
    driver.quit().then(function () {
      done();
    });
  });
});
