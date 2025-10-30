import { test as base, expect, Page } from '@playwright/test'
import { hasValidCookies } from '../utils/cookies'

type Fixtures = {
    authPage: Page
}

const USERNAME = process.env.USERNAME!
const PASSWORD = process.env.PASSWORD!

export const test = base.extend<Fixtures>({
    authPage: async ({ page, baseURL, storageState }, use) => {
        // Check if we have valid cookies before attempting login
        if (typeof storageState === 'string' && await hasValidCookies(storageState)) {
            await page.goto(baseURL!, { waitUntil: 'networkidle' })
            await use(page)
            return
        }

        // Proceed with login if no valid cookies found
        const loginUrl = `${baseURL!.replace(/\/$/, '')}/my-account/`
        await page.goto(loginUrl, { waitUntil: 'domcontentloaded' })

        const nonce = await page.getAttribute('input[name="woocommerce-login-nonce"]', 'value')
        expect(nonce, 'Missing nonce').toBeTruthy()

        const form = new FormData()
        form.append('username', USERNAME)
        form.append('password', PASSWORD)
        form.append('woocommerce-login-nonce', nonce!)
        form.append('_wp_http_referer', '/my-account/')
        form.append('login', 'Log in')

        const resp = await page.request.post(loginUrl, {
            multipart: form,
        })
        expect(resp.ok(), `Login failed: ${resp.status()}`).toBeTruthy()

        await page.goto(baseURL!, { waitUntil: 'networkidle' })
        await expect(page.getByRole('link', { name: 'Log in / Sign up' })).not.toBeVisible()

        await page.context().storageState({ path: storageState as string })

        await use(page)
    }
})

export { expect } from '@playwright/test'