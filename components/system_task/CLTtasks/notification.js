import { By, Key, until, Select } from "selenium-webdriver";

const notification = async function (driver, {
    title,
    code,
    autogenId,
    createConfig
}) {
    await driver.findElement(By.id('actionName'))
    .sendKeys(`${title} NOTIFICATION`);
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
        .sendKeys('creator', Key.ENTER, 'checklist approver', Key.ENTER)

    await driver.wait(until.elementLocated(By.id('subject')), 3000)
        .sendKeys(`${title} NOTIFICATION`)

    await driver.findElement(By.id('actionSave')).click();

    await driver.wait(async function () {
        return await createConfig.click()
            .then(() => true)
            .catch(() => { console.log("waiting..."); return false })
    }, 40000, undefined, 3333)
        .then(() => console.log(`${code} NOTIFICATION CREATED`))
        .catch(() => { console.log(`${code} NOTIFICATION CREATION FAILED`); driver.quit() })
}

export default notification;