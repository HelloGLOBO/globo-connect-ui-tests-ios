const BaseWebPage = require("./BaseWebPage");

class LinguistDashboardPage extends BaseWebPage {
    constructor(page) {
        super(page);
        this.statusSwitch = page.locator(
            ".toggle-switch.medium-switch.hint--top"
        );
        this.confirmModalButton = page.locator('button:has-text("Confirm")');
        this.incomingCallPopUpConfirmButton = page.locator(
            "[class*=swal-button--confirm]"
        );
    }

    async toggleStatus() {
        await this.click(this.statusSwitch);
        // await expect(this.confirmModalButton).toBeVisible();
        await this.click(this.confirmModalButton);
    }

    async answerCall() {
        await this.click(this.incomingCallPopUpConfirmButton);
    }

    async givenSetAvailability(check) {
        const isChecked = await this.statusSwitch.getAttribute("aria-checked");
        if (isChecked !== check) {
            await this.toggleStatus();
        }
    }
}

module.exports = LinguistDashboardPage;
