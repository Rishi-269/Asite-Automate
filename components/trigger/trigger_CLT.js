import { By, until } from "selenium-webdriver";
import {create_trigger, edit_trigger} from "./CLTtriggers/index.js";

async function trigger_CLT(driver, {
    folderName,
    checklists
}){

    //Workflow navigate
    await driver.findElement(By.id('navworkflows')).click();
    await driver.findElement(By.id('sidenav-workflow-rules')).then(
        async function (workflow_trigger) {
            await driver.wait(until.elementIsVisible(workflow_trigger));
            await driver.sleep(2222);
            await workflow_trigger.click();
        }
    );

    const rowList = await driver.findElements(By.className('tree-row'));

    for (let i = 0; i < rowList.length; i++) {

        //select folder
        if (await rowList[i].getText() == folderName) {
            await rowList[i].click();

            const createTrigger = await driver.findElement(By.id('create-rule-btn'));
            await createTrigger.click();

            for (let j = 0; j < checklists.length; j++) {
                let { title, code } = checklists[j];
                
                await create_trigger(driver, {
                    title,
                    code,
                    createTrigger
                })

                await edit_trigger(driver, {
                    title,
                    code,
                    createTrigger
                })
            }                                        

            return;
        }
    }
}

export default trigger_CLT;
