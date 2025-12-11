import { Browser } from "webdriverio";
import BaseAppPage from "./BaseAppPage";

class IntakePage extends BaseAppPage {
    private intakeInput: string;
    private nextButton: string;
    private startCallButton: string;

    constructor(driver: Browser) {
        super(driver);
        this.intakeInput = "//XCUIElementTypeTextField";
        this.nextButton = '//XCUIElementTypeStaticText[@name="NEXT"]';
        this.startCallButton =
            '//XCUIElementTypeStaticText[@name="START CALL"]';
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
