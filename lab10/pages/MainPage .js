import { Builder, By, Key, until } from 'selenium-webdriver';


export class MainPage {
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
}