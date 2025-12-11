import { Page, Locator } from "@playwright/test";
import BaseWebPage from "./BaseWebPage";

class LinguistDashboardPage extends BaseWebPage {
    private statusSwitch: Locator;
    private confirmModalButton: Locator;
    private incomingCallPopUpConfirmButton: Locator;

    constructor(page: Page) {
        super(page);
        this.statusSwitch = page.locator(
            ".toggle-switch.medium-switch.hint--top"
        );
        this.confirmModalButton = page.locator('button:has-text("Confirm")');
        this.incomingCallPopUpConfirmButton = page.locator(
            "[class*=swal-button--confirm]"
        );
    }

    async toggleStatus(): Promise<void> {
        await this.click(this.statusSwitch);
        // await expect(this.confirmModalButton).toBeVisible();
        await this.click(this.confirmModalButton);
    }

    async answerCall(): Promise<void> {
        await this.click(this.incomingCallPopUpConfirmButton);
    }

    async givenSetAvailability(check: string): Promise<void> {
        const isChecked = await this.statusSwitch.getAttribute("aria-checked");
        if (isChecked !== check) {
            await this.toggleStatus();
        }
    }
}

export default LinguistDashboardPage;
