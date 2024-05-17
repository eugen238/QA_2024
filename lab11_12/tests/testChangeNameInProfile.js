import BrowserManager from '../core/browserManager.js';
import MainPage from '../pages/mainPage.js';
import LoginPage from '../pages/loginPage.js';
import UserDataPage from '../pages/userDataPage.js';
import Logger from '../core/logger.js';

(async function testChangeNameInProfile() {
  const driver = await BrowserManager.getDriver();
  try {
    const mainPage = new MainPage(driver);
    await mainPage.open();

    await mainPage.clickLoginButton();

    const loginPage = new LoginPage(driver);
    await loginPage.login('375297269891', 'Tt050403');

    await driver.sleep(10000);

    await driver.navigate().refresh();

    const userDataPage = new UserDataPage(driver);
    await userDataPage.open();

    await userDataPage.enterName('Авген');

    await userDataPage.saveData();

    await driver.sleep(5000);

    await driver.navigate().refresh();
    Logger.log('Пройден');
  } catch (error) {
    Logger.error(`Не пройден: ${error.message}`);
  } finally {
    Logger.log("Успешно");
    await driver.quit();
  }
})();
