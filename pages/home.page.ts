import { Page, Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class HomePage extends BasePage {
    readonly closeButton: Locator

    constructor(page: Page) {
        super(page)
        this.closeButton = page.getByRole('button', { name: 'Close' })
    }
}