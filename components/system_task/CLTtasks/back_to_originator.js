import { By, Key, until, Select } from "selenium-webdriver";

const back_to_originator = async function (driver, {
    title,
    code,
    autogenId,
    createConfig
}) {
    await driver.findElement(By.id('actionName'))
    .sendKeys(`${title} BACK TO ORIGINATOR`);
    await driver.findElement(By.id('actionContext')).then(
        (e) => (new Select(e)).selectByVisibleText('App')
    )
    await driver.wait(until.elementLocated(By.id('actionWorkflowFormType')), 3000).then(
        (e) => (new Select(e)).selectByVisibleText(`${title} [ BPTP-${code} ]`)
    )
    await driver.wait(until.elementLocated(By.id('actionType')), 3000).then(
        (e) => (new Select(e)).selectByVisibleText('Distribute Apps')
    )
    await driver.wait(until.elementLocated(By.id(`s2id_autogen${autogenId}`)), 3000)
    .sendKeys('creator', Key.ENTER, Key.SHIFT, Key.ENTER);
    await driver.findElement(By.name('context-menu-input-actions')).then(
        (e) => (new Select(e)).selectByVisibleText("Respond")
    )
    await driver.findElement(By.name('context-menu-input-actionDate')).then(
        (e) => (new Select(e)).selectByVisibleText("2")
    )
    await driver.findElement(By.className('CMicon-close')).click();

    await driver.wait(until.elementLocated(By.id('subject')), 3000)
    .sendKeys(`${title} BACK TO ORIGINATOR`)

    await driver.findElement(By.id('actionSave')).click();

    await driver.wait(async function () {
        return await createConfig.click()
            .then(() => true)
            .catch(() => { console.log("waiting..."); return false })
    }, 40000, undefined, 3333)
        .then(() => console.log(`${code} BACK TO ORIGINATOR CREATED`))
        .catch(() => { console.log(`${code} BACK TO ORIGINATOR CREATION FAILED`); driver.quit() })
}

export default back_to_originator;