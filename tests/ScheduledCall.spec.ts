import { test } from "../helpers/fixtures";
import { userData, dashboards, callsInformation } from "../data/testData";

test.describe("Join a Scheduled Call", () => {
    test("OVCE-T54 - Not yet started Scheduled Call", async ({
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
        await companyDashboardPage.selectJoinScheduledCall();
        await scheduledCallAppPage.enterScheduledCallCode(
            callsInformation.notStartedScheduledCallJoinCode
        );
        await scheduledCallAppPage.clickJoinScheduledCall();
    });

    test("OVCE-T46 - Started Scheduled Call", async ({
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
        await companyDashboardPage.selectJoinScheduledCall();
        await scheduledCallAppPage.enterScheduledCallCode(
            callsInformation.startedScheduledCallJoinCode
        );
        await scheduledCallAppPage.clickJoinScheduledCall();
        await scheduledCallAppPage.enterParticipantCode(
            callsInformation.participantCode
        );
        await scheduledCallAppPage.clickContinue();
        await scheduledCallAppPage.clickJoinVideoScheduledCall();
        await videoCallPage.verifyInScheduledCall();
    });
});
