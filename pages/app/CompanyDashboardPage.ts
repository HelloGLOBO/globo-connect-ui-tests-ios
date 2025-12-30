import { Browser } from "webdriverio";
import BaseAppPage from "./BaseAppPage";
import { companyDashboardPageLocators } from "../../locators/app/CompanyDashboardPageLocators";

class CompanyDashboardPage extends BaseAppPage {
    private interpreterLabel: string;
    private lineLabel: string;
    private joinScheduledCallButton: string;

    constructor(driver: Browser) {
        super(driver);
        this.interpreterLabel = companyDashboardPageLocators.interpreterLabel;
        this.lineLabel = companyDashboardPageLocators.lineLabel;
        this.joinScheduledCallButton =
            companyDashboardPageLocators.joinScheduledCallButton;
    }

    async selectInterpreterType(): Promise<void> {
        await this.click(this.interpreterLabel);
    }

    async selectLine(): Promise<void> {
        await this.click(this.lineLabel);
    }

    async selectJoinScheduledCall(): Promise<void> {
        await this.click(this.joinScheduledCallButton);
    }
}

export default CompanyDashboardPage;
