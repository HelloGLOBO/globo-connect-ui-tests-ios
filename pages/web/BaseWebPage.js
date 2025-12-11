class BaseWebPage {
    constructor(page) {
        this.page = page;
        this.timeout = 10000;
    }

    async click(selector) {
        await selector.click({ timeout: this.timeout });
    }

    async writeText(selector, text) {
        await selector.clear();
        await selector.fill(text);
    }

    async navigateTo(url) {
        await this.page.goto(url);
    }

    async waitForElement(selector) {
        await selector.waitFor({ state: "visible", timeout: this.timeout });
    }
}

module.exports = BaseWebPage;
