import BrowserManager from '../core/browserManager.js';
import MainPage from '../pages/mainPage.js';
import Logger from '../core/logger.js';
import LoginPage from '../pages/loginPage.js';

(async function testDeermaVacuum() {
  const driver = await BrowserManager.getDriver();
  try {
    const mainPage = new MainPage(driver);
    await mainPage.open();

    await mainPage.clickLoginButton();
    
    const loginPage = new LoginPage(driver);
    await loginPage.login('375297269891', 'Tt050403');

    await driver.sleep(10000);

    await mainPage.clickAddToChosenButton();
    Logger.log('Клик по элементу в слайдере выполнен.');

    await driver.sleep(1000);

    await mainPage.clickChosenButton();
    Logger.log('Клик по кнопке избранное выполнен.');

    const isVacuumDisplayed = await mainPage.deleteItemFromChoosen();
    if (isVacuumDisplayed) {
      Logger.log('Элемент "Вертикальный пылесос Deerma DX700 Plus (с 2-мя фильтрами)" найден.');
      Logger.log('Элемент удален.');
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
