const { remote } = require("webdriverio");
const path = require("path");

class AppiumSetup {
    static async setupIOSDriver() {
        const projectPath = process.cwd();
        const appPath = path.join(projectPath, "globo-portal-ios.app");

        const capabilities = {
            platformName: "iOS",
            "appium:automationName": "XCUITest",
            "appium:app": appPath,
            "appium:deviceName": "iPad (A16)",
            "appium:use_prebuilt_wda": true,
        };

        try {
            const driver = await remote({
                protocol: "http",
                hostname: "localhost",
                port: 4723,
                path: "/",
                capabilities,
            });

            return driver;
        } catch (error) {
            console.error("Failed to initialize iOS driver:", error);
            throw error;
        }
    }

    /**
     * Quit iOS driver
     * @param {object} driver - WebdriverIO driver instance
     */
    static async quitIOSDriver(driver) {
        if (driver) {
            try {
                await driver.deleteSession();
            } catch (error) {
                console.error("Error quitting iOS driver:", error.message);
            }
        }
    }
}

module.exports = AppiumSetup;
