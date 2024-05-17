import BrowserManager from '../core/browserManager.js';
import MainPage from '../pages/mainPage.js';
import Logger from '../core/logger.js';
import LoginPage from '../pages/loginPage.js';

(async function testAddToFavorites() {
  const driver = await BrowserManager.getDriver();
  try {
    const mainPage = new MainPage(driver);
    await mainPage.open();

    await mainPage.clickLoginButton();

    const loginPage = new LoginPage(driver);
    await loginPage.login('375297269891', 'Tt050403');

    await driver.sleep(10000);

    await mainPage.clickAddToFavoritesButton();
    Logger.log('Кнопка сообщить о снижении цены нажата.');

    await driver.sleep(5000);

    const isModalVisible = await mainPage.isFavoriteModalVisible();
    if (isModalVisible) {
      Logger.log('Модальное окно с текстом "Товар добавлен в избранное" отображается.');
    } else {
      Logger.error('Модальное окно с текстом "Товар добавлен в избранное" не отображается.');
    }
  } catch (error) {
    Logger.error(`Ошибка: ${error.message}`);
  } finally {
    Logger.log("Успешно");
    await driver.quit();
  }
})();
