const { Builder, By, Key, until } = require('selenium-webdriver');

async function run() {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://5element.by/#/search/');

    const searchForm = await driver.findElement(By.className('multi-search-header__form'));
    await searchForm.click();

    const searchInput = await driver.findElement(By.xpath('//*[@id="app"]/header/div[1]/div[2]/div/div[1]/div[2]/div[1]/form/input[3]'));
    await searchInput.sendKeys("asus tuf a15");

    await driver.sleep(2000);
    const searchButton = await driver.findElement(By.css('button[data-product_name="Игровой ноутбук Asus TUF Gaming A15 FA506NF-HN018"]'));
    await searchButton.click();

    await driver.sleep(2000);
    const linkElement = await driver.findElement(By.xpath('//*[@id="app"]/div[11]/div/div[3]/div[2]/a[2]')); // Здесь вы можете использовать нужный вам селектор для поиска элемента <a>
    await linkElement.click();
    await driver.wait(until.urlContains('https://5element.by/cart'), 5000);

    
    const text = await driver.findElement(By.css('div[data-product_id="798760"]')).getText();
    if(text.includes('Игровой ноутбук Asus TUF Gaming A15 FA506NF-HN018'))
    {
        console.log('Элемент найден');
    }
    else{
        console.log('Элемент не найден');
    }


  } finally {
    //await driver.quit();
  }
}

run();