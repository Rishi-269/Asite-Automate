import { By } from "selenium-webdriver";

export async function labelRef (control) {
    return await control.findElement(By.css('div:nth-child(1)'))
}

export async function calculatedRef (control) {
    return await control.findElement(By.css('div:nth-child(2)'))
}

export async function textBoxRef (control) {
    return await control.findElement(By.css('div:nth-child(4)'))
}

export async function dateRef (control) {
    return await control.findElement(By.css('div:nth-child(11)'))
}

export async function radioRef (control) {
    return await control.findElement(By.css('div:nth-child(10)'))
}

export async function tableRef (control) {
    return await control.findElement(By.css('div:nth-child(23)'))
}
