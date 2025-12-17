import { test as base } from "@playwright/test";
import { Browser } from "webdriverio";
import AppiumSetup from "./AppiumSetup";
import LoginPage from "../pages/web/LoginPage";
import LinguistDashboardPage from "../pages/web/LinguistDashboardPage";
import LoginAppPage from "../pages/app/LoginAppPage";
import CompanyDashboardPage from "../pages/app/CompanyDashboardPage";
import IntakePage from "../pages/app/IntakePage";
import VideoCallPage from "../pages/app/VideoCallPage";
import FeedbackPage from "../pages/app/FeedbackPage";
import ScheduledCallAppPage from "../pages/app/ScheduledCallAppPage";

type TestFixtures = {
    iosDriver: Browser;

    loginPage: LoginPage;
    dashboardPage: LinguistDashboardPage;

    appLoginPage: LoginAppPage;
    companyDashboardPage: CompanyDashboardPage;
    intakePage: IntakePage;
    videoCallPage: VideoCallPage;
    feedbackPage: FeedbackPage;
    scheduledCallAppPage: ScheduledCallAppPage;
};

export const test = base.extend<TestFixtures>({
    iosDriver: async ({}, use) => {
        const driver = await AppiumSetup.setupIOSDriver();
        await use(driver);
        await AppiumSetup.quitIOSDriver(driver);
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    dashboardPage: async ({ page }, use) => {
        await use(new LinguistDashboardPage(page));
    },

    appLoginPage: async ({ iosDriver }, use) => {
        await use(new LoginAppPage(iosDriver));
    },

    companyDashboardPage: async ({ iosDriver }, use) => {
        await use(new CompanyDashboardPage(iosDriver));
    },

    intakePage: async ({ iosDriver }, use) => {
        await use(new IntakePage(iosDriver));
    },

    videoCallPage: async ({ iosDriver }, use) => {
        await use(new VideoCallPage(iosDriver));
    },

    feedbackPage: async ({ iosDriver }, use) => {
        await use(new FeedbackPage(iosDriver));
    },

    scheduledCallAppPage: async ({ iosDriver }, use) => {
        await use(new ScheduledCallAppPage(iosDriver));
    },
});

export { expect } from "@playwright/test";
