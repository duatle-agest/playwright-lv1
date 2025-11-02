import { Page, Locator } from "@playwright/test"

export class Header {
    readonly page: Page
    readonly header: Locator
    readonly cartLink: Locator
    readonly allDepartmentsLink: Locator
    readonly electronicComponentsLink: Locator
    readonly shopMenuLink: Locator
    readonly removeItemButtons: Locator
    readonly checkoutButton: Locator
    readonly myAccountLink: Locator
    readonly productLoading: Locator

    constructor(page: Page) {
        this.page = page
        this.header = page.getByRole('banner')
        this.cartLink = this.header.getByRole('link').filter({ hasText: '$' })
        this.allDepartmentsLink = this.header.getByText('All departments')
        this.electronicComponentsLink = this.header.getByRole('link', { name: /Electronic Components & Supplies/ })
        this.shopMenuLink = this.header.getByRole('link', { name: 'Shop' })
        this.removeItemButtons = this.page.getByRole('link', { name: 'Remove this item' })
        this.checkoutButton = this.page.getByRole('link', { name: 'Checkout' })
        this.myAccountLink = this.header.locator('.login-link')
        this.productLoading = this.page.locator('.blockUI.blockOverlay').first()
    }

    async goToCart(): Promise<void> {
        await this.cartLink.click()
    }

    async goToShop(): Promise<void> {
        await this.shopMenuLink.click()
    }

    async goToCheckout(): Promise<void> {
        await this.cartLink.hover()
        await this.checkoutButton.click()
    }

    async goToMyAccount(): Promise<void> {
        await this.myAccountLink.click()
    }

    async selectElectronicComponents(): Promise<void> {
        await this.page.waitForLoadState('networkidle')
        await this.allDepartmentsLink.hover()
        await this.electronicComponentsLink.click()
    }

    async removeAllProductsFromCart(): Promise<void> {
        await this.page.waitForLoadState('networkidle')
        const text = await this.cartLink.innerText()
        const count = parseInt(text.match(/^\d+/)?.[0] ?? '0')
        if (count == 0) return
        await this.cartLink.hover()
        await this.page.waitForLoadState('networkidle')
        while (await this.removeItemButtons.count() > 0) {
            await this.removeItemButtons.first().click()
            await this.productLoading.waitFor({ state: 'hidden' })
        }

    }

}