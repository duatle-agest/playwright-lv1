import { expect, Locator, Page } from "@playwright/test"
import { BasePage } from "./base.page"

export class ProductPage extends BasePage {
    readonly addToCartButton: Locator

    constructor(page: Page) {
        super(page)
        this.addToCartButton = page.getByRole('button', { name: /Add to cart/ }).nth(0)

    }

    async addProductToCart(): Promise<void> {
        await this.addToCartButton.click()
    }

    async shouldProductAddedSuccessfully(): Promise<void> {
        await this.toast.shouldProductAddedMessageBeVisible()
    }
}