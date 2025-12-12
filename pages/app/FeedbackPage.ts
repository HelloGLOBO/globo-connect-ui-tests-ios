import { Browser } from "webdriverio";
import BaseAppPage from "./BaseAppPage";
import { feedbackPageLocators } from "../../locators/app/FeedbackPageLocators";

class FeedbackPage extends BaseAppPage {
    private newCallButton: string;

    constructor(driver: Browser) {
        super(driver);
        this.newCallButton = feedbackPageLocators.newCallButton;
    }

    async clickNewCall(): Promise<void> {
        await this.click(this.newCallButton);
    }
}

export default FeedbackPage;
