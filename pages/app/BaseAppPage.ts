import { Browser } from "webdriverio";

class BaseAppPage {
    protected driver: Browser;
    protected timeout: number;

    constructor(driver: Browser) {
        this.driver = driver;
        this.timeout = 10000;
    }

    async click(selector: string, customTimeout?: number): Promise<void> {
        const timeout = customTimeout || this.timeout;
        console.log(`Looking for element with selector: ${selector}`);
        console.log(`Timeout: ${timeout}ms`);
        try {
            const element = await this.driver.$(selector);
            await element.waitForDisplayed({
                timeout: timeout,
                timeoutMsg: `Element not found after ${timeout}ms: ${selector}`,
            });
            console.log(`Element found, clicking...`);
            await element.click();
            console.log(`Element clicked successfully`);
        } catch (error) {
            console.error(`Error clicking element ${selector}:`, error);
            throw error;
        }
    }

    async writeText(selector: string, text: string): Promise<void> {
        const element = await this.driver.$(selector);
        await element.click();
        await element.clearValue();
        await element.setValue(text);
    }

    async switchToContext(index: number): Promise<void> {
        const contexts = await this.driver.getContexts();
        if (index < contexts.length) {
            await this.driver.switchContext(contexts[index]);
        } else {
            throw new Error(
                `Context index ${index} not found. Available: ${contexts.length}`
            );
        }
    }
}

export default BaseAppPage;
