import { Page, Locator } from "@playwright/test";
import BaseWebPage from "./BaseWebPage";
import { linguistDashboardPageLocators } from "../../locators/web/LinguistDashboardPageLocators";

class LinguistDashboardPage extends BaseWebPage {
    private statusSwitch: Locator;
    private confirmModalButton: Locator;
    private incomingCallPopUpConfirmButton: Locator;

    constructor(page: Page) {
        super(page);
        this.statusSwitch = page.locator(
            linguistDashboardPageLocators.statusSwitch
        );
        this.confirmModalButton = page.locator(
            linguistDashboardPageLocators.confirmModalButton
        );
        this.incomingCallPopUpConfirmButton = page.locator(
            linguistDashboardPageLocators.incomingCallPopUpConfirmButton
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
