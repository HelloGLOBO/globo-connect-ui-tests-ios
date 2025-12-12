import { Browser } from "webdriverio";
import BaseAppPage from "./BaseAppPage";
import { videoCallPageLocators } from "../../locators/app/VideoCallPageLocators";

class VideoCallPage extends BaseAppPage {
    private startCallButton: string;
    private endCallButton: string;
    private leaveCallButton: string;

    constructor(driver: Browser) {
        super(driver);
        this.startCallButton = videoCallPageLocators.startCallButton;
        this.endCallButton = videoCallPageLocators.endCallButton;
        this.leaveCallButton = videoCallPageLocators.leaveCallButton;
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
}

export default VideoCallPage;
