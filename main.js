import { By, Key, Builder, until, Select } from "selenium-webdriver";
import {app_builder_CLT, login, system_task_CLT} from "./components/index.js";
import "chromedriver";

const username = "";
const password = ""

async function main() {

    let driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().setTimeouts({ implicit: 8000 });
    
    await login(driver, username, password);

    await app_builder_CLT(driver, {
        title: "DOWN TAKE AND UPTAKE PIPELINES CHECKLIST",
        code: "DUP",
        desc_row: 14,
        folderName: "BPTP Template",
    })

    await driver.quit();

}

main()