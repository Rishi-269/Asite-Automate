import { By, until, Select } from "selenium-webdriver";

const status = async function (driver, {
    title,
    code,
    createConfig
}) {

    await driver.findElement(By.id('actionName'))
    .sendKeys(`${title} STATUS`);

    await driver.findElement(By.id('actionContext')).then(
        (e) => (new Select(e)).selectByVisibleText('App')
    )

    await driver.wait(until.elementLocated(By.id('actionWorkflowFormType')), 3000).then(
        (e) => (new Select(e)).selectByVisibleText(`${title} [ BPTP-${code} ]`)
    )
    await driver.wait(until.elementLocated(By.id('actionType')), 3000).then(
        (e) => (new Select(e)).selectByVisibleText('Status Change')
    )
    await driver.wait(until.elementLocated(By.id('newStatus')), 3000).then(
        (e) => (new Select(e)).selectByVisibleText('Approved - Final')
    )
    await driver.wait(until.elementLocated(By.id('statusChangeReason')), 3000)
        .sendKeys(`${title} STATUS`)

    await driver.findElement(By.id('actionSave')).click();

    await driver.wait(async function () {
        return await createConfig.click()
            .then(() => true)
            .catch(() => { console.log("waiting..."); return false })
    }, 40000, undefined, 3333)
        .then(() => console.log(`${code} STATUS CREATED`))
        .catch(() => { console.log(`${code} STATUS CREATION FAILED`); driver.quit() })
}

export default status;