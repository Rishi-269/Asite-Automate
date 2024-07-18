import {Key} from "selenium-webdriver";

const login = async function(driver, username, password) {
    await driver.get("https://system.asite.com/login");

    await driver.actions()
    .sendKeys(username, Key.TAB, password, Key.ENTER, Key.NULL)
    .perform();
}

export default login;