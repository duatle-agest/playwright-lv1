import { Page, Locator } from "@playwright/test"

export class Header {
    readonly page: Page
    readonly header: Locator
    readonly cartLink: Locator
    readonly allDepartmentsLink: Locator
    readonly electronicComponentsLink: Locator
    readonly shopMenuLink: Locator

    constructor(page: Page) {
        this.page = page
        this.header = page.getByRole('banner')
        this.cartLink = this.header.getByRole('link').filter({ hasText: '$' })
        this.allDepartmentsLink = this.header.getByText('All departments')
        this.electronicComponentsLink = this.header.getByRole('link', { name: /Electronic Components & Supplies/ })
        this.shopMenuLink = this.header.getByRole('link', { name: 'Shop' })
    }

    async goToCart(): Promise<void> {
        await this.cartLink.click()
    }

    selectElectronicComponents = async (): Promise<void> => {
        await this.page.waitForLoadState('networkidle')
        await this.allDepartmentsLink.hover()
        await this.electronicComponentsLink.click()
    }

    async goToShop(): Promise<void> {
        await this.shopMenuLink.click()
    }
}