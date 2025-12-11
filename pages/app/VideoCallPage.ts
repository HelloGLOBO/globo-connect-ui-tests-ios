import { Browser } from "webdriverio";
import BaseAppPage from "./BaseAppPage";

class VideoCallPage extends BaseAppPage {
    private startCallButton: string;
    private endCallButton: string;

    constructor(driver: Browser) {
        super(driver);
        this.startCallButton =
            '//XCUIElementTypeStaticText[@name="START CALL"]';
        this.endCallButton = "ic_end_call_new";
    }

    async clickStartCall(): Promise<void> {
        await this.click(this.startCallButton);
    }

    async clickEndCall(): Promise<void> {
        await this.click(this.endCallButton);
    }
}

export default VideoCallPage;
