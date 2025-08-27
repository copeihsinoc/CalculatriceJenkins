const { Builder, By, Key, until, Select } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const sleep = ms => new Promise(r => setTimeout(r, ms));


(async function testCalculatrice() {

    let options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage'); //shm: shared memory

    // Initialiser le driver avec les bonnes options
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    try {
        // Accéder au site
        //l'app est dans le meme conteneur-> port 8080 expose vers 8081 par Jenkins
        await driver.get('http://127.0.0.1:8080/index.html');

        // --- Test 1 : Vérifier l'Addition ---
        await driver.findElement(By.id('number1')).sendKeys('1');

        //let operator = await driver.findElement(By.id('operation'));
        //let select = new Select(operator);
        //await select.selectByVisibleText("Addition");
        await driver.findElement(By.id('operation')).sendKeys('Addition');

        await driver.findElement(By.id('number2')).sendKeys('1');

        let btn = await driver.wait(until.elementLocated(By.id('calculate')), 20000);
        await btn.click();

        // Afficher les résultats
        let result = await driver.findElement(By.id('result')).getText();
        console.log(result);

        await sleep(3000);

        // --- Test 2 : Division par Zéro ---

        await driver.findElement(By.id('number2')).clear();
        await driver.findElement(By.id('number2')).sendKeys('1');

        //operator = await driver.findElement(By.id('operation'));
        //select = new Select(operator);
       // await select.selectByVisibleText("Multiplication");
       await driver.findElement(By.id('operation')).sendKeys('Multiplication');

        btn = await driver.wait(until.elementLocated(By.id('calculate')), 20000);
        await btn.click();

        // Afficher les résultats
        result = await driver.findElement(By.id('result')).getText();
        console.log(result);

        await sleep(3000);


        // --- Test 3 : Entrée Non Valide ---

        await driver.findElement(By.id('number1')).clear();
        await driver.findElement(By.id('number1')).sendKeys('0');

        await driver.findElement(By.id('number2')).clear();
        await driver.findElement(By.id('number2')).sendKeys('0');

        //operator = await driver.findElement(By.id('operation'));
        //select = new Select(operator);
        //await select.selectByVisibleText("Division");
        await driver.findElement(By.id('operation')).sendKeys('Division');

        btn = await driver.wait(until.elementLocated(By.id('calculate')), 20000);
        await btn.click();

        // Afficher les résultats
        result = await driver.findElement(By.id('result')).getText();

        if (result.includes("Division par zéro impossible.")) {
            console.log(result);
        }


        await sleep(3000);

        // --- Test 4 : Vérifier la Soustraction ---

        await driver.findElement(By.id('number2')).clear();
        await driver.findElement(By.id('number2')).sendKeys('1');

        //operator = await driver.findElement(By.id('operation'));
        //select = new Select(operator);
        //await select.selectByVisibleText("Soustraction");
        await driver.findElement(By.id('operation')).sendKeys('Soustraction');

        btn = await driver.wait(until.elementLocated(By.id('calculate')), 20000);
        await btn.click();

        // Afficher les résultats
        result = await driver.findElement(By.id('result')).getText();
        console.log(result);

        await sleep(5000);


    } finally {
        // Fermer le navigateur
        await driver.quit();
    }
})();

