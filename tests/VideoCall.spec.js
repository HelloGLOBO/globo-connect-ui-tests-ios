import { userData, dashboards } from "../data/testData";
const { test } = require("@playwright/test");
const AppiumSetup = require("../helpers/AppiumSetup");
const LoginPage = require("../pages/web/LoginPage");
const LinguistDashboardPage = require("../pages/web/LinguistDashboardPage");
const LoginAppPage = require("../pages/app/LoginAppPage");
const CompanyDashboardPage = require("../pages/app/CompanyDashboardPage");
const IntakePage = require("../pages/app/IntakePage");
const VideoCallPage = require("../pages/app/VideoCallPage");

test.describe("Login Tests", () => {
    let iosDriver;

    test.beforeAll(async () => {
        iosDriver = await AppiumSetup.setupIOSDriver();
    });

    test("Initiate a video call from app", async ({ page, context }) => {
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
    });

    test.afterAll(async () => {
        await AppiumSetup.quitIOSDriver(iosDriver);
    });
});
