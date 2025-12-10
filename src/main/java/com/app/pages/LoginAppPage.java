package com.app.pages;

import io.appium.java_client.AppiumBy;
import io.appium.java_client.ios.IOSDriver;
import org.openqa.selenium.By;

public class LoginAppPage extends BaseAppPage {

    private By loginInitButton = AppiumBy.name("Login");
    private By emailInput = By.name("Email address");
    private By passwordInput = By.name("Password");
    private By continueButton = By.name("Continue");
    private By interpreterLabel = By.name("  Interpreter");

    public LoginAppPage(IOSDriver driver) {
        super(driver);
    }

    public void clickInitialLogin() {
        click(loginInitButton);
    }

    public void setupContext() {
        switchToContext(0);
    }

    public void enterEmail(String email) {
        writeText(emailInput, email);
    }

    public void enterPassword(String password) {
        writeText(passwordInput, password);
    }

    public void clickContinue() {
        click(continueButton);
    }

    public void selectInterpreter() {
        click(interpreterLabel);
    }

    public void performLogin(String email, String password) {
        clickInitialLogin();
        setupContext();
        enterEmail(email);
        clickContinue();
        enterPassword(password);
        clickContinue();
        selectInterpreter();
    }
}