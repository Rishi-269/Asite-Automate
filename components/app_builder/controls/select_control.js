import { By } from "selenium-webdriver";

const select_control =  async function (canvas, Pos, i, j) {
    if(isNaN(Number(i)) || isNaN(Number(j))){
        await canvas.findElement(By.css(`div > div:nth-child(${Pos})`)).click();
    }
    else{
        await canvas.findElement(By.css(`div > div:nth-child(${Pos})`))
                    .findElement(By.id(i + '-' + j))
                    .findElement(By.css('div > div > div'))
                    .click();
    }
}

export default select_control;