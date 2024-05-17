import BrowserManager from '../core/browserManager.js';
import MainPage from '../pages/mainPage.js';
import Logger from '../core/logger.js';

(async function testAddToCompare() {
  const driver = await BrowserManager.getDriver();
  try {
    const mainPage = new MainPage(driver);
    await mainPage.open();

    await mainPage.clickElementInSlider();
    Logger.log('Клик по элементу в слайдере выполнен.');

    await mainPage.clickCartButton();
    Logger.log('Клик по кнопке сравнения выполнен.');

    const isVacuumDisplayed = await mainPage.isDeermaVacuumDisplayed();
    if (isVacuumDisplayed) {
      Logger.log('Элемент "Вертикальный пылесос Deerma DX700 Plus (с 2-мя фильтрами)" найден.');
    } else {
      Logger.error('Элемент "Вертикальный пылесос Deerma DX700 Plus (с 2-мя фильтрами)" не найден.');
    }
  } catch (error) {
    Logger.error(`Ошибка: ${error.message}`);
  } finally {
    Logger.log("Успешно");
    await driver.quit();
  }
})();
