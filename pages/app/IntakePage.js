const BaseAppPage = require("./BaseAppPage");

class IntakePage extends BaseAppPage {
    constructor(driver) {
        super(driver);
        this.intakeInput = "//XCUIElementTypeTextField";
        this.nextButton = '//XCUIElementTypeStaticText[@name="NEXT"]';
        this.startCallButton =
            '//XCUIElementTypeStaticText[@name="START CALL"]';
    }

    async enterIntakeData(data) {
        await this.writeText(this.intakeInput, data);
    }

    async clickNext() {
        await this.click(this.nextButton);
    }

    async clickStartCall() {
        await this.click(this.startCallButton);
    }
}

module.exports = IntakePage;
