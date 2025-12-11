import { Page, Locator } from "@playwright/test";

class BaseWebPage {
    protected page: Page;
    protected timeout: number;

    constructor(page: Page) {
        this.page = page;
        this.timeout = 10000;
    }

    async click(selector: Locator): Promise<void> {
        await selector.click({ timeout: this.timeout });
    }

    async writeText(selector: Locator, text: string): Promise<void> {
        await selector.clear();
        await selector.fill(text);
    }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async waitForElement(selector: Locator): Promise<void> {
        await selector.waitFor({ state: "visible", timeout: this.timeout });
    }
}

export default BaseWebPage;
