import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './base.page'
import { Product } from '../models/product.model'

export class CartPage extends BasePage {
    readonly checkoutButton: Locator

    constructor(page: Page) {
        super(page)
        this.checkoutButton = page.getByRole('link', { name: 'Proceed to checkout' })
    }

    async shouldProductDisplayInCart(product: Product): Promise<void> {
        await expect(this.page.getByRole('row')
            .filter({
                has: this.page.getByRole('cell')
                    .filter({ hasText: product.getName() })
            })
            .getByRole('cell', { name: product.getPrice() }).first()
        ).toBeVisible()
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click()
    }

}