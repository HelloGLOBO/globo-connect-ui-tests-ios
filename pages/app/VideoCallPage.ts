import { Browser } from "webdriverio";
import BaseAppPage from "./BaseAppPage";
import { videoCallPageLocators } from "../../locators/app/VideoCallPageLocators";
import { expect } from "../../helpers/fixtures";

class VideoCallPage extends BaseAppPage {
    private startCallButton: string;
    private endCallButton: string;
    private endScheduledCallButton: string;
    private leaveCallButton: string;

    constructor(driver: Browser) {
        super(driver);
        this.startCallButton = videoCallPageLocators.startCallButton;
        this.endCallButton = videoCallPageLocators.endCallButton;
        this.leaveCallButton = videoCallPageLocators.leaveCallButton;
        this.endScheduledCallButton =
            videoCallPageLocators.endScheduledCallButton;
    }

    async clickStartCall(): Promise<void> {
        await this.click(this.startCallButton);
    }

    async clickEndCall(): Promise<void> {
        await this.click(this.endCallButton);
    }

    async leaveCall(): Promise<void> {
        await this.click(this.leaveCallButton);
    }

    async verifyInCall(): Promise<void> {
        console.log("Verifying in call by checking end call button visibility");
        const element = await this.driver.$(this.endCallButton);
        const isDisplayed = await element.waitForDisplayed({
            timeout: 15000,
            timeoutMsg: `End call button not displayed after 15s`,
        });
        console.log(`End call button displayed: ${isDisplayed}`);
        expect(isDisplayed).toBeTruthy();
    }

    async verifyInScheduledCall(): Promise<void> {
        console.log(
            "Verifying in scheduled call by checking end scheduled call button visibility"
        );
        try {
            const element = await this.driver.$(this.endScheduledCallButton);
            const isDisplayed = await element.waitForDisplayed({
                timeout: 20000,
                timeoutMsg: `End scheduled call button not displayed after 20s`,
            });
            console.log(`End scheduled call button displayed: ${isDisplayed}`);
            expect(isDisplayed).toBeTruthy();
        } catch (error) {
            console.error("Error verifying scheduled call:", error);
            const contexts = await this.driver.getContexts();
            console.log("Available contexts:", contexts);
            throw error;
        }
    }
}

export default VideoCallPage;
