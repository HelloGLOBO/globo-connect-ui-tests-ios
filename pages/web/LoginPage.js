const BaseWebPage = require("./BaseWebPage");

class LoginPage extends BaseWebPage {
    constructor(page) {
        super(page);
        this.usernameInput = page.locator("#username");
        this.passwordInput = page.locator("#password");
        this.actionButton = page.locator('[name="action"]');
    }

    async enterUsername(username) {
        await this.writeText(this.usernameInput, username);
    }

    async enterPassword(password) {
        await this.writeText(this.passwordInput, password);
    }

    async clickContinue() {
        await this.click(this.actionButton);
    }

    async performLogin(username, password) {
        await this.enterUsername(username);
        await this.clickContinue();
        await this.enterPassword(password);
        await this.clickContinue();
    }
}

module.exports = LoginPage;
