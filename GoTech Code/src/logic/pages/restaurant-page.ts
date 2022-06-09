import { By } from "selenium-webdriver";
import { ClickableElement } from "../elements/clickable-element";
import { Browser } from "../../infra/driver-wrapper/browser";
import { CreateNewRestaurantPopUp } from "../popups/create-new-restaurant-popup";
import { extend } from "lodash";
import { PageBase } from "../../infra/pages-infra/page-base";

class RestaurantPage extends PageBase {

    private createNewRestaurantButtonLocator = "//button[text()='Create new']"

    constructor(browser: Browser) {
        super(browser);
    }

    async openCreateRestaurantPopup() {
        const button = await this.browser.findElement(ClickableElement, By.xpath(this.createNewRestaurantButtonLocator));
        button.click();
        return new CreateNewRestaurantPopUp(this.browser);
    }
}

export { RestaurantPage }