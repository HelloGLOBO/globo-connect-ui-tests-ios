import { Browser } from "webdriverio";
import BaseAppPage from "./BaseAppPage";
import { intakePageLocators } from "../../locators/app/IntakePageLocators";

class IntakePage extends BaseAppPage {
    private intakeInput: string;
    private nextButton: string;
    private startCallButton: string;

    constructor(driver: Browser) {
        super(driver);
        this.intakeInput = intakePageLocators.intakeInput;
        this.nextButton = intakePageLocators.nextButton;
        this.startCallButton = intakePageLocators.startCallButton;
    }

    async enterIntakeData(data: string): Promise<void> {
        await this.writeText(this.intakeInput, data);
    }

    async clickNext(): Promise<void> {
        await this.click(this.nextButton);
    }

    async clickStartCall(): Promise<void> {
        await this.click(this.startCallButton);
    }
}

export default IntakePage;
