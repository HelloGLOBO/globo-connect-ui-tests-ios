import { test } from "../helpers/fixtures";
import { userData, dashboards } from "../data/testData";

test.describe("Login Tests", () => {
    test("Initiate a video call from app", async ({
        page,
        loginPage,
        dashboardPage,
        appLoginPage,
        companyDashboardPage,
        intakePage,
        videoCallPage,
        feedbackPage,
    }) => {
        await loginPage.navigateTo("/");
        await loginPage.performLogin(
            userData.INTERPRETER.email,
            userData.INTERPRETER.password
        );
        await dashboardPage.navigateTo(dashboards.interpreter_dashboard);
        await dashboardPage.givenSetAvailability("true");

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
        await videoCallPage.verifyInCall();
        await videoCallPage.clickEndCall();
        await videoCallPage.leaveCall();
        await feedbackPage.clickNewCall();
    });
});
