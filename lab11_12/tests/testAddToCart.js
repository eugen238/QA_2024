import BrowserManager from '../core/browserManager.js';
import SearchPage from '../pages/searchPage.js';
import Logger from '../core/logger.js';

(async function testAddToCart() {
  const driver = await BrowserManager.getDriver();
  try {
    const searchPage = new SearchPage(driver);
    await driver.get('https://5element.by/#/search/');

    await searchPage.searchProduct('asus tuf a15');

    const isProductFound = await searchPage.isProductDisplayed('Игровой ноутбук Asus TUF Gaming A15 FA506NF-HN018');
    if (isProductFound) {
      Logger.log('Элемент найден');
    } else {
      Logger.error('Элемент не найден');
    }
  } catch (error) {
    Logger.error(`Ошибка: ${error.message}`);
  } finally {
    Logger.log("Успешно");
    await driver.quit();
  }
})();
