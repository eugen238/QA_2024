import { By } from 'selenium-webdriver';

class UserDataPage {
  constructor(driver) {
    this.driver = driver;
  }

  async open() {
    const loginButton2 = await this.driver.findElement(By.xpath('//*[@id="app"]/header/div[1]/div[1]/div/div/div[4]/div[3]'));
    await loginButton2.click();

    const userData = await this.driver.findElement(By.xpath('//*[@id="app"]/main/div[2]/div/div[2]/div[1]/ul/li[1]/a'));
    await userData.click();
  }

  async enterName(name) {
    const nameInput = await this.driver.findElement(By.xpath('//*[@id="app"]/main/div[2]/div/div[2]/div[2]/form/div[2]/div/div[1]/input'));
    await nameInput.sendKeys(name);
  }

  async saveData() {
    const saveButton = await this.driver.findElement(By.xpath('//*[@id="app"]/main/div[2]/div/div[2]/div[2]/form/div[5]/button'));
    await saveButton.click();
  }
}

export default UserDataPage;
