import { Browser } from "webdriverio";
import BaseAppPage from "./BaseAppPage";

class LoginAppPage extends BaseAppPage {
    private loginInitButton: string;
    private emailInput: string;
    private passwordInput: string;
    private continueButton: string;

    constructor(driver: Browser) {
        super(driver);
        this.loginInitButton = "~Login";
        this.emailInput = "~Email address";
        this.passwordInput = "~Password";
        this.continueButton = "~Continue";
    }

    async clickInitialLogin(): Promise<void> {
        await this.click(this.loginInitButton);
    }

    async setupContext(): Promise<void> {
        await this.switchToContext(0);
    }

    async enterEmail(email: string): Promise<void> {
        await this.writeText(this.emailInput, email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.writeText(this.passwordInput, password);
    }

    async clickContinue(): Promise<void> {
        await this.click(this.continueButton);
    }

    async performLogin(email: string, password: string): Promise<void> {
        await this.clickInitialLogin();
        // await this.setupContext();
        await this.enterEmail(email);
        await this.clickContinue();
        await this.enterPassword(password);
        await this.clickContinue();
    }
}

export default LoginAppPage;
