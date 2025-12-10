package com.web.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LinguistDashboardPage extends BaseWebPage {

    // Locators from your script
    private By statusSwitch = By.xpath("//*[@role='switch']");
    private By confirmModalButton = By.xpath("//div[@id='services-toggle-modal-body']//button[normalize-space()='Confirm']");

    public LinguistDashboardPage(WebDriver driver) {
        super(driver);
    }

    public void toggleStatus() {
        click(statusSwitch);
    }

    public void confirmStatusChange() {
        click(confirmModalButton);
    }
}