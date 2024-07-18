import { By, until } from "selenium-webdriver";
import { back_to_originator, clear_task, status, notification } from "./CLTtasks/index.js";

const system_task_CLT = async function (driver, {
    folderName,
    checklists
}) {
    //Nav to worklflow
    await driver.findElement(By.id('navworkflows')).click();

    //To system task
    await driver.findElement(By.id('sidenav-workflow-action')).then(
        async (system_task) => {
            await driver.wait(until.elementIsVisible(system_task))
            await driver.sleep(2222)
            await system_task.click()
        }
    );

    const rowList = await driver.findElements(By.className('tree-row'));

    for (let i = 0; i < rowList.length; i++) {

        //select folder
        if (await rowList[i].getText() == folderName) {
            await rowList[i].click();

            const createConfig = await driver.findElement(By.id('config-action-btn'));
            await createConfig.click();

            let autogenId = 3;
            
            for (let j = 0; j < checklists.length; j++) {
                let { title, code } = checklists[j];

                await back_to_originator(driver, {title, code, autogenId, createConfig})
                .then(() => autogenId += 2);
                await notification(driver, {title, code, autogenId, createConfig})
                .then(() => autogenId += 2);
                await clear_task(driver, {title, code, createConfig})
                .then(() => autogenId += 2);
                await status(driver, {title, code, createConfig});
            }

            return;
        }
    }
}

export default system_task_CLT;