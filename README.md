# Appium + Playwright Testing Framework

A hybrid testing framework combining Appium for mobile app testing and Playwright for web testing, built with TypeScript.

## Table of Contents

-   [Prerequisites](#prerequisites)
-   [Initial Setup](#initial-setup)
-   [Installing Appium](#installing-appium)
-   [Xcode and iOS Simulator Setup](#xcode-and-ios-simulator-setup)
-   [Verifying Installation with Appium Doctor](#verifying-installation-with-appium-doctor)
-   [Running Appium Server](#running-appium-server)
-   [Inspecting the App](#inspecting-the-app)
-   [Running Tests](#running-tests)

## Prerequisites

### Required Software

-   **Node.js** (v18 or higher)

    ```bash
    # Install using Homebrew
    brew install node

    # Verify installation
    node --version
    npm --version
    ```

-   **Xcode** (for iOS testing)

    -   Download from the Mac App Store
    -   Minimum version: 14.0 or higher

-   **Homebrew** (macOS package manager)
    ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```

## Initial Setup

### 1. Install Project Dependencies

Clone the repository and install dependencies:

```bash
# Navigate to project directory
cd appium-framework

# Install Node.js dependencies
npm install
```

### 2. Install System Dependencies

Install required system tools:

````bash
# Install Carthage (dependency manager for iOS)
brew install carthage

# Install Appium Doctor (diagnostic tool)
npm install -g appium-doctor

## Installing Appium

### 1. Install Appium 2.x

```bash
# Install Appium globally
npm install -g appium

# Verify installation
appium --version
````

### 2. Install Appium Drivers

Install the necessary drivers for mobile automation:

```bash
# Install XCUITest driver for iOS
appium driver install xcuitest

# Install UiAutomator2 driver for Android (optional)
appium driver install uiautomator2

# List installed drivers
appium driver list --installed
```

### 3. Install Appium Inspector (Optional but Recommended)

Download Appium Inspector from:
https://github.com/appium/appium-inspector/releases

This is a standalone GUI application for inspecting your app's elements.

## Xcode and iOS Simulator Setup

### 1. Install Xcode

-   Download Xcode from the Mac App Store
-   Open Xcode and accept the license agreement:
    ```bash
    sudo xcodebuild -license accept
    ```

### 2. Install Xcode Command Line Tools

```bash
xcode-select --install

# Verify installation
xcode-select -p
```

### 3. Configure Xcode

````bash
# Set Xcode path
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer

### 4. Setup iOS Simulator

```bash
# List available simulators
xcrun simctl list devices

# Boot a simulator (example with iPhone 15)
xcrun simctl boot "iPhone 15"

# Or open Simulator app
open -a Simulator
````

### 5. Install WebDriverAgent (Required for Appium)

WebDriverAgent is automatically managed by the XCUITest driver, but you may need to configure code signing:

```bash
# Navigate to WebDriverAgent location
cd ~/.appium/node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent

# Open the project in Xcode
open WebDriverAgent.xcodeproj
```

In Xcode:

1. Select the `WebDriverAgentLib` target
2. Go to "Signing & Capabilities"
3. Check "Automatically manage signing"
4. Select your development team

Repeat for `WebDriverAgentRunner` target.

## Verifying Installation with Appium Doctor

Appium Doctor checks if all dependencies are properly installed:

```bash
# Run Appium Doctor for iOS
appium-doctor --ios

# Run Appium Doctor for Android (optional)
appium-doctor --android
```

### Common Issues and Fixes

If Appium Doctor reports issues:

-   **Xcode not configured**: Run `sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer`
-   **Carthage not installed**: Run `brew install carthage`
-   **JAVA_HOME not set**: Add to `~/.zshrc`:
    ```bash
    export JAVA_HOME=$(/usr/libexec/java_home)
    ```

## Running Appium Server

### Option 1: Run Appium Server Manually

Start the Appium server in a separate terminal:

```bash
# Start with default settings (port 4723)
appium

# Start with custom port
appium --port 4724

# Start with logging
appium --log-level debug

# Start with specific base path
appium --base-path /wd/hub
```

Keep this terminal window open while running tests.

### Option 2: Run Appium Server Programmatically

The server can be started within your test code (already configured in `helpers/AppiumSetup.ts`).

### Server Configuration

Default Appium server runs on:

-   **Host**: `localhost` or `127.0.0.1`
-   **Port**: `4723`
-   **Base Path**: `/`

## Inspecting the App

### Method 1: Using Appium Inspector (Recommended)

1. **Start Appium Server**:

    ```bash
    appium
    ```

2. **Open Appium Inspector**

3. **Configure Desired Capabilities**:

    ```json
    {
        "platformName": "iOS",
        "appium:automationName": "xcuitest",
        "appium:app": "/Users/maximilianososa/Documents/GitHub/appium-selenium/appium-framework/globo-portal-ios.app",
        "appium:use_prebuilt_wda": "true",
        "appium:showXcodeLog": "true",
        "appium:deviceName": "iPad (A16)"
    }
    ```

4. **Set Remote Path**: `http://localhost:4723`

5. **Click "Start Session"**

### Method 2: Using appium-doctor with UI

For a quick element tree dump:

```bash
# With Appium session running, you can use WebDriverIO REPL
npx wdio repl ios
```

### Finding Element Locators

Common locator strategies for iOS:

-   **Accessibility ID**: `~"accessibility-id"`
-   **ID**: `id:element-id`
-   **XPath**: `//XCUIElementTypeButton[@name="Login"]`
-   **Class Name**: `XCUIElementTypeButton`
-   **Predicate String**: `-ios predicate string:name == "Login"`
-   **Class Chain**: `-ios class chain:**/XCUIElementTypeButton[`name == "Login"`]`

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Headed Mode

```bash
npm run test:headed
```

### Run Tests in Debug Mode

```bash
npm run test:debug
```

### Run Tests with UI Mode

```bash
npm run test:ui
```

## Project Structure

```
appium-framework/
├── data/                    # Test data files
├── helpers/                 # Helper utilities
│   ├── AppiumSetup.ts      # Appium driver configuration
│   └── fixtures.ts         # Playwright fixtures with page objects
├── locators/               # Element locators
│   ├── app/               # Mobile app locators
│   └── web/               # Web locators
├── pages/                  # Page Object Models
│   ├── app/               # Mobile app pages
│   └── web/               # Web pages
├── tests/                  # Test specifications
├── globo-portal-ios.app/  # iOS application bundle
├── playwright.config.ts    # Playwright configuration
└── package.json           # Project dependencies
```

## Test Architecture

### Fixtures Pattern

This framework uses Playwright's fixtures pattern for dependency injection and automatic lifecycle management. All page objects and the iOS driver are provided as fixtures.

**Benefits:**

-   Automatic setup and teardown of resources
-   Clean test code without manual instantiation
-   Type-safe dependency injection
-   Better test isolation

### Using Fixtures in Tests

```typescript
import { test, expect } from "../helpers/fixtures";
import { userData, dashboards } from "../data/testData";

test.describe("Your Test Suite", () => {
    test("Your test case", async ({
        page, // Playwright page (built-in)
        loginPage, // Web page objects
        dashboardPage,
        appLoginPage, // App page objects
        companyDashboardPage,
        intakePage,
        videoCallPage,
        feedbackPage,
    }) => {
        // Use page objects directly - no instantiation needed
        await loginPage.navigateTo("/");
        await loginPage.performLogin(email, password);

        // iOS driver is automatically managed
        await appLoginPage.performLogin(email, password);
    });
});
```

### Available Fixtures

**Web Page Objects** (using Playwright `page`):

-   `loginPage` - Login page interactions
-   `dashboardPage` - Linguist dashboard page

**App Page Objects** (using Appium `iosDriver`):

-   `appLoginPage` - App login page
-   `companyDashboardPage` - Company dashboard
-   `intakePage` - Intake form page
-   `videoCallPage` - Video call page
-   `feedbackPage` - Feedback page

**Driver:**

-   `iosDriver` - Appium iOS driver (automatically initialized and cleaned up)

### Creating Custom Fixtures

To add new page objects to fixtures, edit `helpers/fixtures.ts`:

```typescript
// 1. Import your page object
import YourNewPage from "../pages/app/YourNewPage";

// 2. Add to TestFixtures type
type TestFixtures = {
    // ... existing fixtures
    yourNewPage: YourNewPage;
};

// 3. Add fixture definition
export const test = base.extend<TestFixtures>({
    // ... existing fixtures
    yourNewPage: async ({ iosDriver }, use) => {
        await use(new YourNewPage(iosDriver));
    },
});
```

## Troubleshooting

### Simulator Issues

```bash
# Reset simulator
xcrun simctl erase all

# Kill all simulator processes
killall Simulator

# Restart simulator
open -a Simulator
```

### Appium Server Issues

```bash
# Kill any process using port 4723
lsof -ti:4723 | xargs kill -9

# Restart Appium with verbose logging
appium --log-level debug
```

### WebDriverAgent Issues

```bash
# Rebuild WebDriverAgent
cd ~/.appium/node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent
xcodebuild -project WebDriverAgent.xcodeproj -scheme WebDriverAgentRunner -destination 'platform=iOS Simulator,name=iPad (A16)' test
```

## Additional Resources

-   [Appium Documentation](https://appium.io/docs/en/latest/)
-   [Playwright Documentation](https://playwright.dev/)
-   [XCUITest Driver](https://github.com/appium/appium-xcuitest-driver)
-   [Appium Inspector](https://github.com/appium/appium-inspector)
-   [WebDriverIO](https://webdriver.io/)
