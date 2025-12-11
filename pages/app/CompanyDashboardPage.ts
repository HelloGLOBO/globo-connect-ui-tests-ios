import { Browser } from "webdriverio";
import BaseAppPage from "./BaseAppPage";

class CompanyDashboardPage extends BaseAppPage {
    private interpreterLabel: string;
    private lineLabel: string;

    constructor(driver: Browser) {
        super(driver);
        this.interpreterLabel = "~  Interpreter";
        this.lineLabel = "//XCUIElementTypeTable/XCUIElementTypeCell[5]";
    }

    async selectInterpreterType(): Promise<void> {
        await this.click(this.interpreterLabel);
    }

    async selectLine(): Promise<void> {
        await this.click(this.lineLabel);
    }
}

export default CompanyDashboardPage;
