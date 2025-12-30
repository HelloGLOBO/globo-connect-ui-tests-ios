import { Browser } from "webdriverio";
import BaseAppPage from "./BaseAppPage";
import { scheduledCallAppPageLocators } from "../../locators/app/ScheduledCallAppPageLocators";

class ScheduledCallAppPage extends BaseAppPage {
    private joinCallCodeInput: string;
    private skipParticipantCodeButton: string;
    private participantCodeInput: string;
    private continueButton: string;
    private joinVideoScheduledCallButton: string;

    constructor(driver: Browser) {
        super(driver);
        this.joinCallCodeInput = scheduledCallAppPageLocators.joinCallCodeInput;
        this.skipParticipantCodeButton =
            scheduledCallAppPageLocators.skipParticipantCode;
        this.participantCodeInput =
            scheduledCallAppPageLocators.participantCodeInput;
        this.continueButton = scheduledCallAppPageLocators.continueButton;
        this.joinVideoScheduledCallButton =
            scheduledCallAppPageLocators.joinVideoScheduledCallButton;
    }

    async enterScheduledCallCode(code: string): Promise<void> {
        await this.writeText(this.joinCallCodeInput, code);
    }

    async clickJoinScheduledCall(): Promise<void> {
        await this.click(scheduledCallAppPageLocators.joinScheduledCallButton);
    }

    async clickSkipParticipantCode(): Promise<void> {
        await this.click(this.skipParticipantCodeButton);
    }

    async enterParticipantCode(code: string): Promise<void> {
        await this.writeText(this.participantCodeInput, code);
    }

    async clickContinue(): Promise<void> {
        await this.click(this.continueButton);
    }

    async clickJoinVideoScheduledCall(): Promise<void> {
        await this.click(this.joinVideoScheduledCallButton);
    }
}

export default ScheduledCallAppPage;
