import { Page, Locator } from "@playwright/test";
import BaseWebPage from "./BaseWebPage";

class LoginPage extends BaseWebPage {
    private usernameInput: Locator;
    private passwordInput: Locator;
    private actionButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator("#username");
        this.passwordInput = page.locator("#password");
        this.actionButton = page.locator('[name="action"]');
    }

    async enterUsername(username: string): Promise<void> {
        await this.writeText(this.usernameInput, username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.writeText(this.passwordInput, password);
    }

    async clickContinue(): Promise<void> {
        await this.click(this.actionButton);
    }

    async performLogin(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.clickContinue();
        await this.enterPassword(password);
        await this.clickContinue();
    }
}

export default LoginPage;
