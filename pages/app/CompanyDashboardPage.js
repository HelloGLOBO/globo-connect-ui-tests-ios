const BaseAppPage = require("./BaseAppPage");

class CompanyDashboardPage extends BaseAppPage {
    constructor(driver) {
        super(driver);
        this.interpreterLabel = "~  Interpreter";
        this.lineLabel = "//XCUIElementTypeTable/XCUIElementTypeCell[5]";
    }

    async selectInterpreterType() {
        await this.click(this.interpreterLabel);
    }

    async selectLine() {
        await this.click(this.lineLabel);
    }
}

module.exports = CompanyDashboardPage;
