import { Page, Locator, expect } from "@playwright/test"

export class Toast {
    readonly page: Page
    readonly productAddedMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.productAddedMessage = page.getByText(/(has been added to your cart|Product added\.)/i)
    }

    async shouldProductAddedMessageBeVisible(): Promise<void> {
        await expect(this.productAddedMessage).toBeVisible()
    }

    async waitForProductAddedMessage(): Promise<void> {
        await this.productAddedMessage.waitFor({ state: 'visible' })
    }

    async waitForProductAddedMessageToDisappear(): Promise<void> {
        await this.productAddedMessage.waitFor({ state: 'hidden' })
    }
}