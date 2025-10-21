import { Page, Locator } from "@playwright/test"

export class Header {
    readonly page: Page
    readonly header: Locator
    readonly cartLink: Locator
    readonly allDepartmentsLink: Locator
    readonly electronicComponentsLink: Locator

    constructor(page: Page) {
        this.page = page
        this.header = page.getByRole('banner')
        this.cartLink = this.header.getByRole('link', { name: /\$/ })
        this.allDepartmentsLink = this.header.getByText('All departments')
        this.electronicComponentsLink = this.header.getByRole('link', { name: /Electronic Components & Supplies/ })
    }
}