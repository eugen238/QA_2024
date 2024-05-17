import { By, until } from 'selenium-webdriver';
import Logger from '../core/logger.js';
import BrowserManager from '../core/browserManager.js';

class SearchPage {
  constructor(driver) {
    this.driver = driver;
    this.searchForm = By.className('multi-search-header__form');
    this.searchInput = By.xpath('//*[@id="app"]/header/div[1]/div[2]/div/div[1]/div[2]/div[1]/form/input[3]');
    this.searchButton = By.css('button[data-product_name="Игровой ноутбук Asus TUF Gaming A15 FA506NF-HN018"]');
    this.linkElement = By.xpath('//*[@id="app"]/div[11]/div/div[3]/div[2]/a[2]');
    this.productElement = By.css('div[data-product_id="798760"]');
  }

  async searchProductForFind(productName){
    const searchForm = await this.driver.findElement(this.searchForm);
    await searchForm.click();
    Logger.log('Клик по форме поиска.');

    const searchInput = await this.driver.findElement(this.searchInput);
    await searchInput.sendKeys(productName);
    Logger.log('Заполнение поля поиска.');

    await this.driver.sleep(2000);

    const searchButton = await this.driver.findElement(By.className('multi-search-header__submit'));
    await searchButton.click();
    Logger.log('Клик по кнопке поиска.');
  }

  async searchProduct(productName) {
    const searchForm = await this.driver.findElement(this.searchForm);
    await searchForm.click();
    Logger.log('Клик по форме поиска.');

    const searchInput = await this.driver.findElement(this.searchInput);
    await searchInput.sendKeys(productName);
    Logger.log('Заполнение поля поиска.');

    await this.driver.sleep(2000);

    const searchButton = await this.driver.findElement(this.searchButton);
    await searchButton.click();
    Logger.log('Клик по кнопке поиска.');

    await this.driver.sleep(2000);

    const linkElement = await this.driver.findElement(this.linkElement);
    await linkElement.click();
    Logger.log('Клик по элементу.');

    await this.driver.wait(until.urlContains('https://5element.by/cart'), 5000);
  }

  async isProductDisplayed(productName) {
    const text = await this.driver.findElement(this.productElement).getText();
    return text.includes(productName);
  }

  async deleteFromCartClick(){
        await this.driver.findElement(By.css('a[aria-label="remove"]'));
  }

  async findProduct(){

    const catalogWrap = await this.driver.findElement(By.xpath('//*[@id="app"]/main/div/div[2]/div/div/div[2]/div/div/div/div/div[2]/div[2]/div[1]'));
    const productDivs = await catalogWrap.findElements(By.css('div[data-ec_product]'));

    let productFound = false;
    for (let div of productDivs) {
      const dataEcProduct = await div.getAttribute('data-ec_product');
      if (dataEcProduct.includes('asus tuf f15')) {
        productFound = true;
        Logger.log('Продукт "asus tuf f15" найден.');
        break;
      }
    }
    return isProductFound;
  }

  async usePromo(){
    const searchForm = await this.driver.findElement(By.className('shopping-promo-inner'));
    await searchForm.click();
    Logger.log('Клик по форме поиска.');

    const searchInput = await this.driver.findElement(By.xpath('//*[@id="cart-g-main"]/div[1]/div[2]/div/div/div[2]/div/div[2]/div/div/form/input'));
    await searchInput.sendKeys("FGIO567");
    Logger.log('Заполнение поля поиска.');

    // Нажимаем на кнопку с классом "shopping-promo-submit" для отправки промокода
    const promoSubmitButton = await this.driver.findElement(By.css('.shopping-promo-submit.btn'));
    await promoSubmitButton.click();

    await this.driver.sleep(2000);

    const warningElement = await this.driver.findElement(By.className('form-caption--warning'));
    const warningText = await warningElement.getText();
    if (warningText.includes('Промокод не найден')) {
      Logger.log('Промокод не найден');
    }
  }
}

export default SearchPage;
