import { By, until, Key} from "selenium-webdriver";
import { setRequired } from "./controls/properties.js";
import select_control from "./controls/select_control.js";

async function update_req(driver, {
    checklists,
    folderName

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
    
    for (let index = 0; index < checklists.length; index++) {

        await driver.getAllWindowHandles()
        .then(async (windows) => {
            for(let i = 0; i < windows.length; i++){
                if(windows[i] == originalWindow){
                    await driver.switchTo().window(windows[i])
                    console.log(await driver.getTitle())
                    break;
                }
            }
        })

        let {code, n} = checklists[index];

        let rows = await driver.findElements(By.className('rows'))
        for (let i = 0; i < rows.length; i++) {
            if(await rows[i].findElement(By.css('div:nth-child(5)')).getText() == code){
                await driver.wait(async () => {
                    return rows[i].findElement(By.css('div:nth-child(8)')).click()
                    .then(() => true)
                    .catch(async () => {
                        rows = await driver.findElements(By.className('rows'));
                        return false;
                    })
                    
                }, 60000, undefined, 5000);
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

        //canvas
        const canvas = await driver.findElement(By.className('container-fluid'))

        //START FROM HERE
        for (let i = 1; i <= n; i++) {
            await select_control(canvas, 4, i, 11);
            await setRequired(driver);
        }
    }
    
}

export default update_req;