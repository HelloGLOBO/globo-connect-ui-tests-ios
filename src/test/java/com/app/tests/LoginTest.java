package com.app.tests;

import com.app.pages.LoginAppPage;
import com.web.pages.LinguistDashboardPage;
import com.web.pages.LoginPage;
import org.testng.annotations.Test;

public class LoginTest extends BaseTest {

    @Test
    public void login() {
        LoginPage loginPage = new LoginPage(webDriver);
        LinguistDashboardPage dashboardPage = new LinguistDashboardPage(webDriver);
        loginPage.navigateTo("https://portal.dev.helloglobo.com");
        loginPage.performLogin("maximiliano.sosa.wideman+inter1@helloglobo.com", "Prueba1234*");
        dashboardPage.navigateTo("https://portal.dev.helloglobo.com/linguist_dashboard/index");

        dashboardPage.toggleStatus();
        dashboardPage.confirmStatusChange();
        // --- iOS PART ---
        LoginAppPage appLoginPage = new LoginAppPage(iOSdriver);
        appLoginPage.performLogin("maximiliano.sosa.wideman+ai@helloglobo.com", "Prueba1234*");
    }
}