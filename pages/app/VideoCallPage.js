const BaseAppPage = require("./BaseAppPage");

class VideoCallPage extends BaseAppPage {
    constructor(driver) {
        super(driver);
        this.startCallButton =
            '//XCUIElementTypeStaticText[@name="START CALL"]';
    }

    async clickStartCall() {
        await this.click(this.startCallButton);
    }
}

module.exports = VideoCallPage;
