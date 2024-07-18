import { By, until, Key} from "selenium-webdriver";
import { calculatedRef, dateRef, labelRef, radioRef, textBoxRef } from "./controls/control.js";
import place_control from "./controls/place_control.js";
import { gotoAdvanced, RadioIncrease, setCharLimit, setCloseDate, setDataField, setDateCurrent, setField, setFormStatusSync, setHidden, setLabel, setLabelBold, setLabelCenter, setLabelSize, setLabelText, setRadioVal, setReadOnly, setRequired, setRowCol, setValue, tableMerge } from "./controls/properties.js";
import select_control from "./controls/select_control.js";

async function app_builder_CLT(driver, {
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

    //get refrences of control
    const control = await driver.findElement(By.className('control-items-wrapper'));    
    const label = await labelRef(control);
    const calculated = await calculatedRef(control);
    const textBox = await textBoxRef(control);
    const date = await dateRef(control);
    const radio = await radioRef(control);

    //START FROM HERE

    let curr = 1;
    // Heading Table
    await select_control(canvas, ++curr);
    await setRowCol(driver, 1, 1);
        //Title label
        await place_control(driver, canvas, label, curr, 0, 0);
        await select_control(canvas, curr, 0, 0)
        await setLabelText(driver, title);
        await setLabelSize(driver, 16);
        await setLabelCenter(driver);
        await setLabelBold(driver);
    
    //Project Table
    await select_control(canvas, ++curr);
    await setRowCol(driver, 3, 3);
        //drop fields
        await place_control(driver, canvas, calculated, curr, 0, 0);
        await place_control(driver, canvas, date, curr, 0, 1);
        await place_control(driver, canvas, calculated, curr, 0, 2);
        await place_control(driver, canvas, textBox, curr, 1, 0);
        await place_control(driver, canvas, textBox, curr, 1, 1);
        await place_control(driver, canvas, textBox, curr, 1, 2);
        await place_control(driver, canvas, textBox, curr, 2, 0);
        await place_control(driver, canvas, textBox, curr, 2, 1);

        // date
        await select_control(canvas, curr, 0, 1);
        await setLabel(driver, "Date");
        await setField(driver, "Date");
        await setDataField(driver, "Date");
        await setDateCurrent(driver);
        await setRequired(driver);
        await setLabelSize(driver, 12);
        await setLabelBold(driver);

        //Project name
        await select_control(canvas, curr, 0, 0);
        await setLabel(driver, "Project Name");
        await setField(driver, "Proj_Name");
        await setValue(driver, "{{Project Name}}");
        await setLabelSize(driver, 12);
        await setLabelBold(driver);

        //checklist No
        await select_control(canvas, curr, 0, 2);
        await setLabel(driver, "Checklist Number");
        await setField(driver, "Checklist_Number");
        await setValue(driver, "{{Form ID}}");
        await setLabelSize(driver, 12);
        await setLabelBold(driver);
        
        //Contractor Name
        await select_control(canvas, curr, 1, 0);
        await setLabel(driver, "Contractor Name");
        await setField(driver, "Contractor_Name");
        await setDataField(driver, "Contractor_Name");
        await setRequired(driver);
        await setLabelSize(driver, 12);
        await setLabelBold(driver);
        
        //Client
        await select_control(canvas, curr, 1, 1);
        await setLabel(driver, "Client");
        await setField(driver, "Client");
        await setDataField(driver, "Client");
        await setRequired(driver);
        await setLabelSize(driver, 12);
        await setLabelBold(driver);
        
        //Employer
        await select_control(canvas, curr, 1, 2);
        await setLabel(driver, "Employer");
        await setField(driver, "Employer");
        await setDataField(driver, "Employer");
        await setRequired(driver);
        await setLabelSize(driver, 12);
        await setLabelBold(driver);

        //Location
        await select_control(canvas, curr, 2, 0);
        await setLabel(driver, "Location");
        await setField(driver, "Location");
        await setDataField(driver, "Location");
        await setRequired(driver);
        await setLabelSize(driver, 12);
        await setLabelBold(driver);

        //Drawing No
        await select_control(canvas, curr, 2, 1);
        await setLabel(driver, "Drawing No");
        await setField(driver, "Drawing_No");
        await setDataField(driver, "Drawing_No");
        await setRequired(driver);
        await setLabelSize(driver, 12);
        await setLabelBold(driver);

    //Description Table
    await select_control(canvas, ++curr);
    await setRowCol(driver, desc_row, 18);
    await canvas.findElement(By.css(`div > div:nth-child(${curr})`)).then(
        async (e) => {
            for(let i = 0; i < desc_row - 1; i++){
                await tableMerge(driver, e, i, 1, 10, true);
                await tableMerge(driver, e, i, 11, 14, true);
                await tableMerge(driver, e, i, 15, 17, true);
            }
            await tableMerge(driver, e, desc_row - 1, 0, 17, true);
        }
    )

    //place fields
        await place_control(driver, canvas, label, curr, 0, 0);
        await place_control(driver, canvas, label, curr, 0, 1);
        await place_control(driver, canvas, label, curr, 0, 11);
        await place_control(driver, canvas, label, curr, 0, 15);
        await place_control(driver, canvas, label, curr, desc_row-1, 0);

        for (let i = 1; i < desc_row - 1; i++) {
            await place_control(driver, canvas, label, curr, i, 0);
            await place_control(driver, canvas, label, curr, i, 1);
            await place_control(driver, canvas, radio, curr, i, 11);
            await place_control(driver, canvas, textBox, curr, i, 15);
        }

        //header row
        await select_control(canvas, curr, 0, 1);
        await setLabelText(driver, "Description");
        await setLabelCenter(driver);
        await setLabelBold(driver)

        await select_control(canvas, curr, 0, 0);
        await setLabelText(driver, "SL");
        await setLabelBold(driver)

        await select_control(canvas, curr, 0, 11);
        await setLabelText(driver, "Acceptable");
        await setLabelCenter(driver);
        await setLabelBold(driver)

        await select_control(canvas, curr, 0, 15);
        await setLabelText(driver, "Remarks");
        await setLabelCenter(driver);
        await setLabelBold(driver);
        
        for (let i = 1; i < desc_row - 1; i++) {
            await select_control(canvas, curr, i, 0);
            await setLabelText(driver, i);

            await select_control(canvas, curr, i, 11);
            await setLabel(driver, "");
            await setRequired(driver);
            await gotoAdvanced(driver);
            await RadioIncrease(driver);
            await setRadioVal(driver, 1, "YES", "YES");
            await setRadioVal(driver, 2, "NO", "NO");
            await setRadioVal(driver, 3, "NA", "NA");

            await select_control(canvas, curr, i, 15);
            await setLabel(driver, "");
            await setCharLimit(driver, 150);
        }

    // Date code
    await select_control(canvas, ++curr);
    await setDateCurrent(driver, 200);
    await setRequired(driver);
    await setReadOnly(driver);
    await setHidden(driver);
    await gotoAdvanced(driver);
    await setCloseDate(driver);

    //update form status
    await select_control(canvas, ++curr);
    await setLabel(driver, "Update Form Status");
    await setField(driver, "Update_Form_Status");
    await setHidden(driver);
    await gotoAdvanced(driver);
    await setFormStatusSync(driver);
}

export default app_builder_CLT;