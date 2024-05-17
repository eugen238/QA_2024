import BrowserManager from '../core/browserManager.js';
import SearchPage from '../pages/searchPage.js';
import Logger from '../core/logger.js';

(async function testPromo() {
  const driver = await BrowserManager.getDriver();
  try {
    const searchPage = new SearchPage(driver);
    await driver.get('https://5element.by/#/search/');

    await searchPage.searchProduct('asus tuf a15');

    await searchPage.usePromo();

  } catch (error) {
    Logger.error(`Ошибка: ${error.message}`);
  } finally {
    await driver.quit();
  }
})();
