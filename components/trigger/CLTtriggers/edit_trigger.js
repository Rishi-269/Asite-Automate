import { By, Key, until, Select } from "selenium-webdriver";

const edit_trigger = async function (driver, {
    title,
    code,
    createTrigger
}) {

    await driver.findElement(By.id('ruleName')).sendKeys(`${title} EDIT TRIGGER`);
    await driver.findElement(By.id('ruleDesc')).sendKeys(`${title} EDIT TRIGGER`);
    await driver.findElement(By.id('ruleObj')).then(
        (e) => (new Select(e)).selectByVisibleText('App')
    )
    await driver.wait(until.elementLocated(By.id('ruleWorkflowFormTypeId')), 3000).then(
        (e) => (new Select(e)).selectByVisibleText(`${title} [ BPTP-${code} ]`)
    )
    await driver.wait(until.elementLocated(By.id('inputMetaDataId0')), 3000)
    .sendKeys(Key.ARROW_DOWN, Key.ENTER)
    await driver.wait(until.elementLocated(By.name('value0')), 3000).then(
        (e) => (new Select(e)).selectByVisibleText('Submitted')
    )
    await driver.wait(until.elementLocated(By.id('ruleTrigger')), 3000).then(
        (e) => (new Select(e)).selectByVisibleText('Change Status')
    )
    await driver.wait(until.elementLocated(By.id('ruleAction')), 3000).then(
        (e) => (new Select(e)).selectByVisibleText(title)
    )

    await driver.findElement(By.id('ruleSave')).click();

    await driver.wait(async function(){
        return await createTrigger.click()
        .then(() => true)
        .catch(() => {console.log("waiting..."); return false})
    },40000, undefined, 3333)
    .then(() => console.log(`${code} EDIT TRIGGER CREATED`))
    .catch(() => {console.log(`${code} EDIT TRIGGER CREATION TIMEOUT`); driver.quit()})

}

export default edit_trigger;