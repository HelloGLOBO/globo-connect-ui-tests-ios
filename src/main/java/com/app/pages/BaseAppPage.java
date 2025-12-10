package com.app.pages;

import io.appium.java_client.ios.IOSDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class BaseAppPage {
    protected IOSDriver driver;
    protected WebDriverWait wait;

    public BaseAppPage(IOSDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    protected void click(By locator) {
        wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
    }

    protected void writeText(By locator, String text) {
        // Your script clicks the input before typing, so we replicate that behavior here
        WebElement element = wait.until(ExpectedConditions.elementToBeClickable(locator));
        element.click();
        element.clear();
        element.sendKeys(text);
    }

    /**
     * Helper to switch to a specific context index (e.g., 0).
     * This mimics: iOSdriver.context(myList.get(0))
     */
    public void switchToContext(int index) {
        Set<String> contexts = driver.getContextHandles();
        List<String> contextList = new ArrayList<>(contexts);
        if (index < contextList.size()) {
            driver.context(contextList.get(index));
        } else {
            throw new RuntimeException("Context index " + index + " not found. Available: " + contextList.size());
        }
    }
}