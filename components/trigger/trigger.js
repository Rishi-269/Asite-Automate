import { By, Key, Builder, until, Select } from "selenium-webdriver";
import "chromedriver";

//paste json file
let checklists = [
    {
        title: "FLOOR WORK (PREPARATORY WORK) CHECKLIST",
        code: "FLW"
    },
    {
        title: "PLASTERING (EXTERNAL) CHECKLIST",
        code: "PEC"
    }
]

let dist_iter = -1; //auto generated id starts from -1 or 1

async function system_task() {

    let driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().setTimeouts({ implicit: 8000 });
    await driver.get("https://system.asite.com/login");
    const actions = driver.actions();

    //login
    await actions
        .sendKeys(username)
        .sendKeys(Key.TAB)
        .sendKeys(password)
        .sendKeys(Key.ENTER)
        .perform();

    //Workflow system task
    await driver.findElement(By.id('navworkflows')).click();
    await driver.findElement(By.id('sidenav-workflow-action')).then(
        async function (system_task) {
            await driver.wait(until.elementIsVisible(system_task))
            await driver.sleep(2222)
            await system_task.click()
        }
    );

    await driver.findElements(By.className('tree-row')).then(
        async function (rowList) {
            for (row of rowList) {
                //select folder
                if (await row.getText() == 'BPTP Template') {
                    await row.click();

                    //System tasks creation
                    const createConfig = await driver.findElement(By.id('config-action-btn'));
                    await createConfig.click();

                    for (item of checklists) {
                        let { title, code } = item;

                        //CLEAR TASK
                        await driver.findElement(By.id('actionName')).sendKeys(`${title} CLEAR TASK`);
                        await driver.findElement(By.id('actionContext')).then(
                            (e) => (new Select(e)).selectByVisibleText('App')
                        )
                        await driver.wait(until.elementLocated(By.id('actionWorkflowFormType')), 3000).then(
                            (e) => (new Select(e)).selectByVisibleText(`${title} [ BPTP-${code} ]`)
                        )
                        await driver.wait(until.elementLocated(By.id('actionType')), 3000).then(
                            (e) => (new Select(e)).selectByVisibleText('Clear Tasks')
                        ).finally(() => dist_iter += 2)

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


                        // STATUS
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

                        // NOTIFICATION
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
                        ).finally(() => dist_iter += 2)
                        await driver.wait(until.elementLocated(By.id(`s2id_autogen${dist_iter}`)), 3000)
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

                        // BACK TO ORIGINATOR
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
                        ).finally(() => dist_iter += 2)
                        await driver.wait(until.elementLocated(By.id(`s2id_autogen${dist_iter}`)), 3000)
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

                }
            }
        }
    )

    await driver.quit();
}

system_task()