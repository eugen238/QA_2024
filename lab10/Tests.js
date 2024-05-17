import { Builder, By, Key, until } from 'selenium-webdriver';
import { SearchPage } from './pages/SearchPage .js';
import { LoginPage } from './pages/LoginPage.js';
import { MainPage } from './pages/MainPage .js';
import { UserDataPage } from './pages/UserDataPage.js';


async function AddToCard(){
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    const searchPage = new SearchPage(driver);
    await driver.manage().window().maximize();
    await driver.get('https://5element.by/#/search/');

    await searchPage.searchProduct('asus tuf a15');

    const isProductFound = await searchPage.isProductDisplayed('Игровой ноутбук Asus TUF Gaming A15 FA506NF-HN018');
    console.log('Элемент найден');
  }
  catch{
    console.log('Элемент не найден');
  }  
  finally {

  }
}

async function ChangeNameInProfile(){
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.manage().window().maximize();

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
    console.log("Пройден");
  }
  catch{
    console.log("Не пройден");
  }
  finally {

  }
}

async function run() {
  await AddToCard();
  await ChangeNameInProfile();
}

run();