import { By, until, Select } from "selenium-webdriver";

const clear_task = async function (driver, {
    title,
    code,
    createConfig
}) {

    await driver.findElement(By.id('actionName')).sendKeys(`${title} CLEAR TASK`);
    await driver.findElement(By.id('actionContext')).then(
        (e) => (new Select(e)).selectByVisibleText('App')
    )
    await driver.wait(until.elementLocated(By.id('actionWorkflowFormType')), 3000).then(
        (e) => (new Select(e)).selectByVisibleText(`${title} [ BPTP-${code} ]`)
    )
    await driver.wait(until.elementLocated(By.id('actionType')), 3000).then(
        (e) => (new Select(e)).selectByVisibleText('Clear Tasks')
    )

    await driver.wait(until.elementLocated(By.className('selectWrapper')), 3000).then(
        async (e) => {
            if (await e.findElement(By.css('label')).getText() == 'Assign Status') {
                await e.findElement(By.id('actions0')).click()
            }
            else {
                console.log(`Enable assign status for ${code}`)
                await driver.quit();
            }
        }
    )

    await driver.findElement(By.id('actionSave')).click();

    await driver.wait(async function () {
        return await createConfig.click()
            .then(() => true)
            .catch(() => { console.log("waiting..."); return false })
    }, 40000, undefined, 3333)
        .then(() => console.log(`${code} CLEAR TASK CREATED`))
        .catch(() => { console.log(`${code} CLEAR TASK CREATION FAILED`); driver.quit() })

}

export default clear_task;