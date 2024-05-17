import { Builder, By, Key, until } from 'selenium-webdriver';

export class SearchPage {
  constructor(driver) {
    this.driver = driver;
    this.searchForm = By.className('multi-search-header__form');
    this.searchInput = By.xpath('//*[@id="app"]/header/div[1]/div[2]/div/div[1]/div[2]/div[1]/form/input[3]');
    this.searchButton = By.css('button[data-product_name="Игровой ноутбук Asus TUF Gaming A15 FA506NF-HN018"]');
    this.linkElement = By.xpath('//*[@id="app"]/div[11]/div/div[3]/div[2]/a[2]');
    this.productElement = By.css('div[data-product_id="798760"]');
  }

  async searchProduct(productName) {
    const searchForm = await this.driver.findElement(this.searchForm);
    await searchForm.click();

    const searchInput = await this.driver.findElement(this.searchInput);
    await searchInput.sendKeys(productName);

    await this.driver.sleep(2000);

    const searchButton = await this.driver.findElement(this.searchButton);
    await searchButton.click();

    await this.driver.sleep(2000);

    const linkElement = await this.driver.findElement(this.linkElement);
    await linkElement.click();

    await this.driver.wait(until.urlContains('https://5element.by/cart'), 5000);
  }

  async isProductDisplayed(productName) {
    const text = await this.driver.findElement(this.productElement).getText();
    return text.includes(productName);
  }
}