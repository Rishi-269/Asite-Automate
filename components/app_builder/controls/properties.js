import { By, Key, Builder, until, Select } from "selenium-webdriver";

//common properties
export async function setLabel (driver, labelName) {
    await driver.findElement(By.id('label')).then(
        async (e) => {
            await e.clear()
            await e.sendKeys(String(labelName))
        }
    )
}

export async function setLabelSize (driver, labelSize) {
    await driver.findElement(By.css("body > div.ng-scope > create > div > propertybox > div.property-box > div.scroller-outer > div > div > div:nth-child(3) > div > div.property-content > div > table > tbody > tr:nth-child(1) > td > span:nth-child(2) > input"))
    .then(
        async (e) => {
            await e.clear();
            await e.sendKeys(String(labelSize));
        }
    )
}

export async function setLabelBold(driver) {
    await driver.findElement(By.css("body > div.ng-scope > create > div > propertybox > div.property-box > div.scroller-outer > div > div > div:nth-child(3) > div > div.property-content > div > table > tbody > tr:nth-child(2) > td > span:nth-child(1) > button"))
    .click()
}

export async function setLabelCenter(driver) {
    await driver.findElement(By.css("body > div.ng-scope > create > div > propertybox > div.property-box > div.scroller-outer > div > div > div:nth-child(3) > div > div.property-content > div > table > tbody > tr:nth-child(2) > td > span:nth-child(4) > span > label:nth-child(2) > button"))
    .click()
}

export async function setField (driver, fieldName) {
    await driver.findElement(By.id('field.name')).then(
        async (e) => {
            await e.clear()
            await e.sendKeys(String(fieldName))
        }
    )
}

export async function setDataField (driver, DataFieldName) {
    await driver.findElement(By.id('Data-Field-Name')).then(
        async (e) => {
            await e.clear()
            await e.sendKeys(String(DataFieldName))
        }
    )
}

export async function setRequired(driver) {
    await driver.findElement(By.id('required')).click()
}

export async function gotoAdvanced(driver) {
    await driver.findElement(By.id('advanced')).click()
}

export async function setReadOnly(driver) {
    await driver.findElement(By.id('read.only')).click()
}

export async function setHidden(driver) {
    await driver.findElement(By.id('hidden')).click()
}

//label

export async function setLabelText (driver,text) {
    await driver.findElement(By.id('text')).then(
        async (e) => {
            await e.clear()
            await e.sendKeys(String(text))
        }
    )
}

//textbox

export async function setCharLimit(driver, limit) {
    await driver.findElement(By.id('char.limit')).then(
        async (e) => {
            await e.sendKeys(Key.BACK_SPACE, Key.BACK_SPACE, String(limit))
        }
    )
}


//date
export async function setDateCurrent(driver, days) {
    await driver.findElement(By.css("body > div.ng-scope > create > div > propertybox > div.property-box > div.scroller-outer > div > div > div:nth-child(1) > div > div.property-content > div > table > tbody > tr:nth-child(5) > td.date-picker-wrapper.ng-scope > div:nth-child(2) > label > input"))
    .click()
    
    if(!isNaN(Number(days))){
        await driver.actions()
        .sendKeys(Key.TAB, String(days), Key.NULL)
        .perform()
    }
}

export async function setCloseDate(driver) {
    await driver.findElement(By.id('closed.date')).click()
}


//calculated
export async function setValue(driver, value){
    await driver.findElement(By.id('value')).then(
        async (e) => {
            await e.clear()
            await e.sendKeys(String(value))
        }
    )
}

//table

export async function setRowCol(driver, rows, cols){
    await driver.findElement(By.id('Rows')).sendKeys(Key.BACK_SPACE, rows);
    await driver.findElement(By.id('Columns')).sendKeys(Key.BACK_SPACE, cols);
}

export async function tableMerge(driver, currTable , fixed , from, to, horizontal){
    if (horizontal == true) {
        await driver.actions()
        .keyDown(Key.SHIFT)
        .dragAndDrop(await currTable.findElement(By.id(fixed+'-'+from)), await currTable.findElement(By.id(fixed+'-'+to)))
        .keyUp(Key.SHIFT)
        .perform()
        .then(async () => await driver.findElement(By.css("body > div.ng-scope > create > div > propertybox > div.property-box > div.scroller-outer > div > div > div:nth-child(6) > div > div.property-content > div > table > tbody > tr > td:nth-child(1) > span:nth-child(1) > button")).click())
    } else {
        await driver.actions()
        .keyDown(Key.SHIFT)
        .dragAndDrop(await currTable.findElement(By.id(from+'-'+fixed)), await currTable.findElement(By.id(to+'-'+fixed)))
        .keyUp(Key.SHIFT)
        .perform()
        .then(async () => await driver.findElement(By.css("body > div.ng-scope > create > div > propertybox > div.property-box > div.scroller-outer > div > div > div:nth-child(6) > div > div.property-content > div > table > tbody > tr > td:nth-child(1) > span:nth-child(1) > button")).click())
    }
    
}

//radio

export async function RadioIncrease(driver) {
    await driver.findElement(By.css("body > div.ng-scope > create > div > propertybox > div.property-box > div.scroller-outer > div > div > div:nth-child(3) > div > div.property-content > div > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(6)"))
    .click()
}

export async function setRadioVal(driver, radioPos , label, value) {
    await driver.findElement(By.css(`
        body > div.ng-scope > create > div > propertybox > div.property-box > div.scroller-outer > div > div > div:nth-child(3) > div > div.property-content > div > table > tbody > tr > td > table > tbody > tr:nth-child(${radioPos + 1}) > td:nth-child(1) > input`
    )).then(
        async (e) => {
            await e.clear();
            await e.sendKeys(label);
        }
    )

    await driver.findElement(By.css(`
        body > div.ng-scope > create > div > propertybox > div.property-box > div.scroller-outer > div > div > div:nth-child(3) > div > div.property-content > div > table > tbody > tr > td > table > tbody > tr:nth-child(${radioPos + 1}) > td:nth-child(2) > input`
    )).then(
        async (e) => {
            await e.clear();
            await e.sendKeys(value);
        }
    )
}

//dropdown

export async function setFormStatusSync(driver) {
    driver.findElement(By.id('app.status')).click()
}