import { remote, Browser } from "webdriverio";
import * as path from "path";

interface IOSCapabilities {
    platformName: string;
    "appium:automationName": string;
    "appium:app": string;
    "appium:deviceName": string;
    "appium:use_prebuilt_wda": boolean;
    "appium:autoAcceptAlerts": boolean;
}

class AppiumSetup {
    static async setupIOSDriver(): Promise<Browser> {
        const projectPath = process.cwd();
        const appPath = path.join(projectPath, "globo-portal-ios.app");

        const capabilities: IOSCapabilities = {
            platformName: "iOS",
            "appium:automationName": "XCUITest",
            "appium:app": appPath,
            "appium:deviceName": "iPad (A16)",
            "appium:use_prebuilt_wda": true,
            "appium:autoAcceptAlerts": true,
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

    static async quitIOSDriver(driver: Browser | null): Promise<void> {
        if (driver) {
            try {
                await driver.deleteSession();
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Error quitting iOS driver:", error.message);
                } else {
                    console.error("Error quitting iOS driver:", error);
                }
            }
        }
    }
}

export default AppiumSetup;
