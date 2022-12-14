const webdriver = require("selenium-webdriver");

const demoUser = {
  firstname: "Demo",
  lastname: "User",
  email: "demouser1adas444@demo.com",
  telephone: "12345566",
  password: "demouser1234",
  confirm: "demouser1234",
};

class ECommerceHomePage {
  constructor(driver) {
    this.driver = driver;
    this.macBookProductSection = '[title="MacBook Pro"]';
    this.addToCartButton = "#entry_216842 > button";
    this.cartIcon = ".cart-icon";
    this.registerButton = "#column-right a:nth-child(2)";
    this.termsAgreementInput = 'label[for="input-agree"]';
    this.continueButton = 'input[value="Continue"]';
    this.successMessage = "#content > h1"
  }

  async goToUrl(url) {
    await this.driver.get(url);
  }

  async closeBrowser() {
    await this.driver.quit();
  }

  async clickElement(selector) {
    await this.driver.findElement(webdriver.By.css(selector)).click();
  }

  async getElementTextContent(selector) {
    return (
      await this.driver.findElement(webdriver.By.css(selector))
    ).getText();
  }

  async addMacBookToCart() {
    await this.clickElement(this.macBookProductSection);
    await this.clickElement(this.addToCartButton);
  }

  async getCartIConTextContent() {
    return await this.getElementTextContent(this.cartIcon);
  }

  async getAccountRegistrationSuccessTextContent() {
      return await this.getElementTextContent(this.successMessage)
  }

  async goToRegisterPage() {
    await this.clickElement(this.registerButton);
  }

  async fillRegistrationForm() {
    Object.keys(demoUser).forEach(async (key) => {
      await this.driver
        .findElement(webdriver.By.name(key))
        .sendKeys(demoUser[key]);
    });
    
    await this.clickElement(this.termsAgreementInput)
    await this.clickElement(this.continueButton)
  }
}

exports.ECommerceHomePage = ECommerceHomePage;
