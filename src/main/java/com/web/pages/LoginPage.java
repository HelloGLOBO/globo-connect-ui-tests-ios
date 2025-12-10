package com.web.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LoginPage extends BaseWebPage {

    // --- Locators (Private to encapuslate them) ---
    private By usernameInput = By.id("username");
    private By passwordInput = By.id("password");
    // The "Continue" button is used for both email and password submission
    private By actionButton = By.name("action");

    // --- Constructor ---
    public LoginPage(WebDriver driver) {
        super(driver);
    }

    // --- Page Actions ---

    public void enterUsername(String username) {
        writeText(usernameInput, username);
    }

    public void enterPassword(String password) {
        writeText(passwordInput, password);
    }

    public void clickContinue() {
        click(actionButton);
    }

    /**
     * Convenience method to perform the full login flow.
     * This matches the logic: Enter User -> Click -> Enter Pass -> Click
     */
    public void performLogin(String username, String password) {
        enterUsername(username);
        clickContinue();
        enterPassword(password);
        clickContinue();
    }
}