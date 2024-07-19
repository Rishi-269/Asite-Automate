import { By, until, Key} from "selenium-webdriver";
import { calculatedRef, dateRef, labelRef, radioRef, textBoxRef } from "./controls/control.js";
import place_control from "./controls/place_control.js";
import { gotoAdvanced, RadioIncrease, setCharLimit, setCloseDate, setDataField, setDateCurrent, setField, setFormStatusSync, setHidden, setLabel, setLabelBold, setLabelCenter, setLabelSize, setLabelText, setRadioVal, setReadOnly, setRequired, setRowCol, setValue, tableMerge } from "./controls/properties.js";
import select_control from "./controls/select_control.js";

async function app_builder_template(driver, {
    title,
    code,
    folderName,
    desc_row
}){
    const originalWindow = await driver.getWindowHandle();

    //Project 
    await driver.findElement(By.id('navprojects')).click();

    const items = await driver.findElements(By.className('repeated-item'))
    for (let i = 0; i < items.length; i++) {
        if(await items[i].findElement(By.css('li:nth-child(3)')).getText() == folderName){
            await driver.actions().contextClick(items[i]).perform()
            await driver.actions().move({origin: driver.findElement(By.css('#wrap > app-root > adoddle-context-menu > ul > li:nth-child(4)'))}).perform()
            await driver.actions().click(driver.findElement(By.css('#wrap > app-root > adoddle-context-menu > ul > li:nth-child(4) > ul > li:nth-child(7)'))).perform()
            break;
        }
    }

    const rows = await driver.findElements(By.className('rows'))
    for (let i = 0; i < rows.length; i++) {
        if(await rows[i].findElement(By.css('div:nth-child(5)')).getText() == code){
            await rows[i].findElement(By.css('div:nth-child(8)')).click();
            break;
        }
    }

    // let editApp = await driver.findElement(By.id('editAppsModal'));
    // await editApp.click()

    await driver.wait(async () => {
        return (await driver.getAllWindowHandles()).length == 2;
    }, 10000, undefined, 2000)
    .then(async () => {
        await driver.getAllWindowHandles()
        .then(async (windows) => {
            for(let i = 0; i < windows.length; i++){
                if(windows[i] != originalWindow){
                    await driver.switchTo().window(windows[i])
                    console.log(await driver.getTitle())
                    break;
                }
            }
        })
    })

    await driver.wait(until.elementLocated(By.css('body > div.ng-scope > create > div > div.side-panel.side-bar-hidden > div > span'), 10000)).click()
    await driver.sleep(2000)

    //canvas
    const canvas = await driver.findElement(By.className('container-fluid'))
    const control = await driver.findElement(By.className('control-items-wrapper'));    


    //get refrences of control
    const label = await labelRef(control);
    const calculated = await calculatedRef(control);
    const textBox = await textBoxRef(control);
    const date = await dateRef(control);
    const radio = await radioRef(control);

    //START FROM HERE

    
}

export default app_builder_template;
