import { Browser } from "webdriverio";
import BaseAppPage from "./BaseAppPage";
import { videoCallPageLocators } from "../../locators/app/VideoCallPageLocators";

class VideoCallPage extends BaseAppPage {
    private startCallButton: string;
    private endCallButton: string;

    constructor(driver: Browser) {
        super(driver);
        this.startCallButton = videoCallPageLocators.startCallButton;
        this.endCallButton = videoCallPageLocators.endCallButton;
    }

    async clickStartCall(): Promise<void> {
        await this.click(this.startCallButton);
    }

    async clickEndCall(): Promise<void> {
        await this.click(this.endCallButton);
    }
}

export default VideoCallPage;
