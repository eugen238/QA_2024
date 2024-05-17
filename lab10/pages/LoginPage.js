import { Builder, By, Key, until } from 'selenium-webdriver';


export class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  async login(username, password) {
    const loginInput = await this.driver.findElement(By.css('input[type="text"][name="login"]'));
    await loginInput.sendKeys(username);

    const passwordInput = await this.driver.findElement(By.css('input[type="password"][placeholder="Пароль"]'));
    await passwordInput.sendKeys(password);

    const submitButton = await this.driver.findElement(By.xpath('//*[@id="app"]/div[16]/div/div[2]/div[1]/form/div[4]/button'));
    await submitButton.click();
  }
}