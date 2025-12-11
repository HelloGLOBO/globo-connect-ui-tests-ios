const BaseAppPage = require("./BaseAppPage");

class LoginAppPage extends BaseAppPage {
    constructor(driver) {
        super(driver);
        this.loginInitButton = "~Login";
        this.emailInput = "~Email address";
        this.passwordInput = "~Password";
        this.continueButton = "~Continue";
    }

    async clickInitialLogin() {
        await this.click(this.loginInitButton);
    }

    async setupContext() {
        await this.switchToContext(0);
    }

    async enterEmail(email) {
        await this.writeText(this.emailInput, email);
    }

    async enterPassword(password) {
        await this.writeText(this.passwordInput, password);
    }

    async clickContinue() {
        await this.click(this.continueButton);
    }

    async performLogin(email, password) {
        await this.clickInitialLogin();
        // await this.setupContext();
        await this.enterEmail(email);
        await this.clickContinue();
        await this.enterPassword(password);
        await this.clickContinue();
    }
}

module.exports = LoginAppPage;
