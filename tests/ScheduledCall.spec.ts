import { test } from "../helpers/fixtures";
import { userData, dashboards, callsInformation } from "../data/testData";

test.describe("Join a Scheduled Call", () => {
    test("Not yet started Scheduled Call", async ({
        page,
        loginPage,
        dashboardPage,
        appLoginPage,
        companyDashboardPage,
        scheduledCallAppPage,
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

        await page.waitForTimeout(2000);

        await companyDashboardPage.selectJoinScheduledCall();
        await scheduledCallAppPage.enterScheduledCallCode(
            callsInformation.notStartedScheduledCallJoinCode
        );
        await page.waitForTimeout(2000);
        await scheduledCallAppPage.clickJoinScheduledCall();
        await page.waitForTimeout(2000);
    });

    test("Started Scheduled Call", async ({
        page,
        loginPage,
        dashboardPage,
        appLoginPage,
        companyDashboardPage,
        scheduledCallAppPage,
        videoCallPage,
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

        await page.waitForTimeout(2000);

        await companyDashboardPage.selectJoinScheduledCall();
        await scheduledCallAppPage.enterScheduledCallCode(
            callsInformation.startedScheduledCallJoinCode
        );
        await page.waitForTimeout(2000);
        await scheduledCallAppPage.clickJoinScheduledCall();
        await page.waitForTimeout(2000);
        await scheduledCallAppPage.enterParticipantCode(
            callsInformation.participantCode
        );
        await page.waitForTimeout(2000);
        await scheduledCallAppPage.clickContinue();
        await page.waitForTimeout(2000);
        await scheduledCallAppPage.clickJoinVideoScheduledCall();
        await page.waitForTimeout(8000);
        await videoCallPage.verifyInScheduledCall();
    });
});
