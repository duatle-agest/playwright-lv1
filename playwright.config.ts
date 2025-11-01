import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '.env') })

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://demo.testarchitect.com/',
    trace: 'on-first-retry',
    headless: false,
    actionTimeout: 20 * 1000,
    navigationTimeout: 30 * 1000,
  },

  expect: {
    timeout: 10 * 1000,
  },

  timeout: 5 * 60 * 1000,

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

})
