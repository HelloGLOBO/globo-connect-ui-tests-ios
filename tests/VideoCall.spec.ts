import { test } from "@playwright/test";
import { Browser } from "webdriverio";
import { userData, dashboards } from "../data/testData";
import AppiumSetup from "../helpers/AppiumSetup";
import LoginPage from "../pages/web/LoginPage";
import LinguistDashboardPage from "../pages/web/LinguistDashboardPage";
import LoginAppPage from "../pages/app/LoginAppPage";
import CompanyDashboardPage from "../pages/app/CompanyDashboardPage";
import IntakePage from "../pages/app/IntakePage";
import VideoCallPage from "../pages/app/VideoCallPage";
import FeedbackPage from "../pages/app/FeedbackPage";

test.describe("Login Tests", () => {
    let iosDriver: Browser;

    test.beforeAll(async () => {
        iosDriver = await AppiumSetup.setupIOSDriver();
    });

    test("Initiate a video call from app", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new LinguistDashboardPage(page);
        await loginPage.navigateTo("/");
        await loginPage.performLogin(
            userData.INTERPRETER.email,
            userData.INTERPRETER.password
        );
        await dashboardPage.navigateTo(dashboards.interpreter_dashboard);
        await dashboardPage.givenSetAvailability("true");

        // --- iOS APP PART (Appium) ---
        const appLoginPage = new LoginAppPage(iosDriver);
        const companyDashboardPage = new CompanyDashboardPage(iosDriver);
        const intakePage = new IntakePage(iosDriver);
        const videoCallPage = new VideoCallPage(iosDriver);
        const feedbackPage = new FeedbackPage(iosDriver);

        await appLoginPage.performLogin(
            userData.USER.email,
            userData.USER.password
        );
        await companyDashboardPage.selectInterpreterType();
        await companyDashboardPage.selectLine();
        await intakePage.enterIntakeData("Playwright");
        await intakePage.clickNext();
        await intakePage.clickStartCall();
        await videoCallPage.clickStartCall();
        await page.waitForTimeout(5000);

        await dashboardPage.answerCall();
        await page.waitForTimeout(5000);
        await videoCallPage.clickEndCall();
        await videoCallPage.leaveCall();
        await feedbackPage.clickNewCall();
    });

    test.afterAll(async () => {
        await AppiumSetup.quitIOSDriver(iosDriver);
    });
});
