import BrowserManager from '../core/browserManager.js';
import SearchPage from '../pages/searchPage.js';
import Logger from '../core/logger.js';

(async function testAddToCart() {
  const driver = await BrowserManager.getDriver();
  try {
    const searchPage = new SearchPage(driver);
    await driver.get('https://5element.by/#/search/');

    await searchPage.searchProductForFind('fgrhjkljhg');

    await driver.sleep(2000);

    const isProductFound = searchPage.findProduct(driver);
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
