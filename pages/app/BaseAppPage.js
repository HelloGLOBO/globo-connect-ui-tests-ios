class BaseAppPage {
    constructor(driver) {
        this.driver = driver;
        this.timeout = 10000;
    }

    async click(selector) {
        const element = await this.driver.$(selector);
        await element.waitForDisplayed({ timeout: this.timeout });
        await element.click();
    }

    async writeText(selector, text) {
        const element = await this.driver.$(selector);
        await element.click();
        await element.clearValue();
        await element.setValue(text);
    }

    async switchToContext(index) {
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

module.exports = BaseAppPage;
