import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./tests",
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1,
    reporter: "html",
    use: {
        baseURL: "https://portal.dev.helloglobo.com",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        video: "retain-on-failure",
    },
    timeout: 600000,

    projects: [
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
                permissions: ["camera", "microphone"],
                launchOptions: {
                    headless: false,
                    args: [
                        "--start-maximized",
                        "--disable-gpu",
                        "--no-sandbox",
                        "--use-fake-ui-for-media-stream",
                        "--use-fake-device-for-media-stream",
                    ],
                },
            },
        },
    ],
});
