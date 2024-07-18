import { By } from "selenium-webdriver";

const place_control =  async function (driver, canvas, controlRef, tablePos, i, j) {
    if(Number(tablePos) > 0){
        await driver.actions()
        .dragAndDrop(controlRef, await canvas.findElement(By.css(`div > div:nth-child(${tablePos})`)).findElement(By.id(i + '-' + j)))
        .perform();
    }
    else{
        await driver.actions()
        .dragAndDrop(controlRef, canvas)
        .perform();
    }
}

export default place_control;