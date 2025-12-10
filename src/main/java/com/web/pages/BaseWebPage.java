package com.web.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class BaseWebPage {
    protected WebDriver driver;
    protected WebDriverWait wait;

    // Constructor
    public BaseWebPage(WebDriver driver) {
        this.driver = driver;
        // Centralized wait time (e.g., 10 seconds)
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    // Wrapper method for clicking elements safely
    protected void click(By locator) {
        wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
    }

    // Wrapper method for sending text safely
    protected void writeText(By locator, String text) {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        element.clear(); // Good practice to clear before typing
        element.sendKeys(text);
    }

    // Navigation wrapper
    public void navigateTo(String url) {
        driver.get(url);
    }
}