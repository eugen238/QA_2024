import { By, until } from 'selenium-webdriver';
import Logger from '../core/logger.js';

class MainPage {
  constructor(driver) {
    this.driver = driver;
  }

  async open() {
    await this.driver.get('https://5element.by/');
    await this.driver.sleep(1000);
  }

  async clickLoginButton() {
    const loginButton = await this.driver.findElement(By.xpath('//*[@id="app"]/header/div[1]/div[1]/div/div/div[4]/a[2]/div'));
    await loginButton.click();
  }

  async clickElementInSlider() {
    const sliderElementLocator = By.xpath('//div[contains(@data-ec_product, \'"id":"751665"\')]');
    let sliderElement;
    for (let i = 0; i < 10; i++) {
      try {
        sliderElement = await this.driver.findElement(sliderElementLocator);
        break;
      } catch (error) {
        await this.driver.executeScript("window.scrollBy(0, 1000);"); // Скроллим вниз
        await this.driver.sleep(1000); // Даем странице загрузиться
      }
    }
    if (!sliderElement) {
      throw new Error('Элемент не найден');
    }
    await this.driver.executeScript("arguments[0].scrollIntoView(true);", sliderElement);
    await this.driver.wait(until.elementIsVisible(sliderElement), 5000); // Ожидание, пока элемент станет видимым
    const linkElement = await sliderElement.findElement(By.xpath('.//a[@title="В сравнение"]'));
    await linkElement.click();
  }

  async clickCartButton() {
    const hBarLocator = By.css('div.h-bar');
    await this.driver.wait(until.elementLocated(hBarLocator), 10000); // Ожидание появления элемента
    const hBarElement = await this.driver.findElement(hBarLocator);

    const cartButtonLocator = By.css('div.h-added-drop.h-drop.js-drop-select');
    const cartButton = await hBarElement.findElement(cartButtonLocator);
    await cartButton.click();
  }

    async clickChosenButton() {
    const hBarLocator = By.css('div.h-bar');
    await this.driver.wait(until.elementLocated(hBarLocator), 10000); // Ожидание появления элемента
    const hBarElement = await this.driver.findElement(hBarLocator);

    const ChosenButtonLocator = By.xpath('//*[@id="app"]/header/div[1]/div[2]/div/div[1]/div[1]/div[3]/div[2]');
    const ChosenButton = await hBarElement.findElement(ChosenButtonLocator);
    await ChosenButton.click();
  }

  async isDeermaVacuumDisplayed() { 
    const vacuumElementLocator = By.xpath('//*[@id="app"]/header/div[1]/div[2]/div/div[1]/div[1]/div[3]/div[1]/div[2]/div[2]/div/div/div[2]/a');
    await this.driver.wait(until.elementLocated(vacuumElementLocator), 10000); // Ожидание появления элемента
    const vacuumElement = await this.driver.findElement(vacuumElementLocator);
    const text = await vacuumElement.getText();
    return text.includes('Вертикальный пылесос Deerma DX700 Plus (с 2-мя фильтрами)');
  }

  async deleteItemFromCompare(){
      const vacuumElementLocator = By.xpath('//*[@id="app"]/header/div[1]/div[2]/div/div[1]/div[1]/div[3]/div[1]/div[2]/div[2]/div/div/div[2]/a');
  await this.driver.wait(until.elementLocated(vacuumElementLocator), 10000); // Ожидание появления элемента
  const vacuumElement = await this.driver.findElement(vacuumElementLocator);

  // Получаем текст элемента
  const text = await vacuumElement.getText();
  if (text.includes('Вертикальный пылесос Deerma DX700 Plus (с 2-мя фильтрами)')) {
    // Если текст совпадает, находим кнопку "Удалить" внутри элемента
    const deleteButton = await vacuumElement.findElement(By.xpath('//*[@id="app"]/header/div[1]/div[2]/div/div[1]/div[1]/div[3]/div[1]/div[2]/div[2]/div/div/div[3]/button'));
    Logger.log("Нажатие на кнопку удалить.");
    // Нажимаем на кнопку "Удалить"
    await deleteButton.click();
    return true;
  } else {
    return false;
  }
  }

    async deleteItemFromChoosen(){             
      const vacuumElementLocator = By.xpath('//*[@id="app"]/header/div[1]/div[2]/div/div[1]/div[1]/div[3]/div[2]/div[2]/div[2]/div/div/div[2]/a');
  await this.driver.wait(until.elementLocated(vacuumElementLocator), 10000); // Ожидание появления элемента
  const vacuumElement = await this.driver.findElement(vacuumElementLocator);

  // Получаем текст элемента
  const text = await vacuumElement.getText();
  if (text.includes('Вертикальный пылесос Deerma DX700 Plus (с 2-мя фильтрами)')) {
    // Если текст совпадает, находим кнопку "Удалить" внутри элемента
    const deleteButton = await this.driver.findElement(By.xpath('//*[@id="app"]/header/div[1]/div[2]/div/div[1]/div[1]/div[3]/div[2]/div[2]/div[2]/div/div/div[3]/button'));
    Logger.log("Нажатие на кнопку удалить.");
    // Нажимаем на кнопку "Удалить"
    await deleteButton.click();
    return true;
  } else {
    return false;
  }
  }

    async isDeermaVacuumDisplayedInChosenWindow() {         
    const vacuumElementLocator = By.xpath('//*[@id="app"]/header/div[1]/div[2]/div/div[1]/div[1]/div[3]/div[2]/div[2]/div[2]/div/div/div[2]/a');
    await this.driver.wait(until.elementLocated(vacuumElementLocator), 10000); // Ожидание появления элемента
    const vacuumElement = await this.driver.findElement(vacuumElementLocator);
    const text = await vacuumElement.getText();
    return text.includes('Вертикальный пылесос Deerma DX700 Plus (с 2-мя фильтрами)');
  }
  

  

  async clickAddToFavoritesButton() {
    const sliderElementLocator = By.xpath('//div[contains(@data-ec_product, \'"id":"751665"\')]');
    let sliderElement;
    for (let i = 0; i < 10; i++) {
      try {
        sliderElement = await this.driver.findElement(sliderElementLocator);
        break;
      } catch (error) {
        await this.driver.executeScript("window.scrollBy(0, 1000);"); // Скроллим вниз
        await this.driver.sleep(1000); // Даем странице загрузиться
      }
    }
    if (!sliderElement) {
      throw new Error('Элемент не найден');
    }
    await this.driver.executeScript("arguments[0].scrollIntoView(true);", sliderElement);
    await this.driver.wait(until.elementIsVisible(sliderElement), 5000); // Ожидание, пока элемент станет видимым
    const linkElement = await sliderElement.findElement(By.xpath('.//a[@title="Сообщить о снижении цены"]'));
    await linkElement.click();
  }

    async clickAddToChosenButton() {
    const sliderElementLocator = By.xpath('//div[contains(@data-ec_product, \'"id":"751665"\')]');
    let sliderElement;
    for (let i = 0; i < 10; i++) {
      try {
        sliderElement = await this.driver.findElement(sliderElementLocator);
        break;
      } catch (error) {
        await this.driver.executeScript("window.scrollBy(0, 1000);"); // Скроллим вниз
        await this.driver.sleep(1000); // Даем странице загрузиться
      }
    }
    if (!sliderElement) {
      throw new Error('Элемент не найден');
    }
    await this.driver.executeScript("arguments[0].scrollIntoView(true);", sliderElement);
    await this.driver.wait(until.elementIsVisible(sliderElement), 5000); // Ожидание, пока элемент станет видимым
    const linkElement = await sliderElement.findElement(By.xpath('.//a[@title="В избранное"]'));
    await linkElement.click();
  }



async isFavoriteModalVisible() {
  //const modalLocator = By.className('modal-popup__body');
  try {
    // await this.driver.wait(until.elementLocated(modalLocator), 10000); // Ожидание появления модального окна
    // const modalBody = await this.driver.findElement(modalLocator);
    const text = await this.driver.findElement(By.xpath('//*[@id="app"]/div[13]/div/div/div[1]/div')).getText();
    return text.includes('Товар добавлен в избранное');
  } catch (error) {
    console.log(error)
    return false;
  }
}
}

export default MainPage;
