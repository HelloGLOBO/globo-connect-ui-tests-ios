package com.app.tests;

import io.appium.java_client.ios.IOSDriver;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import java.net.URI;

public class BaseTest {

    protected IOSDriver iOSdriver;
    protected WebDriver webDriver;

    @BeforeMethod
    public void setUp() {
        try {
            // Web Setup
            ChromeOptions options = new ChromeOptions();
            options.addArguments("--disable-notifications");
            options.addArguments("--use-fake-ui-for-media-stream");
            webDriver = new ChromeDriver(options);
            webDriver.manage().window().maximize();

            // --- iOS Setup ---
            DesiredCapabilities caps = new DesiredCapabilities();
            caps.setCapability("platformName", "iOS");
            caps.setCapability("appium:automationName", "XCUITest");

            String projectPath = System.getProperty("user.dir");
            caps.setCapability("appium:app", projectPath + "/src/test/resources/apps/globo-portal-ios.app");
            caps.setCapability("appium:deviceName", "iPad (A16)");
            caps.setCapability("appium:use_prebuilt_wda", "true");

            iOSdriver = new IOSDriver(new URI("http://localhost:4723/").toURL(), caps);

        } catch (Exception e) {
            e.printStackTrace();
            tearDown();
            throw new RuntimeException("Driver initialization failed", e);
        }
    }

    @AfterMethod
    public void tearDown() {
        if (iOSdriver != null) {
            try {
                iOSdriver.quit();
            } catch (Exception e) {
                System.err.println("Error quitting iOS driver: " + e.getMessage());
            }
        }

        if (webDriver != null) {
            try {
                webDriver.quit();
            } catch (Exception e) {
                System.err.println("Error quitting Web driver: " + e.getMessage());
            }
        }
    }
}