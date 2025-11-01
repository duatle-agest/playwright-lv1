import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './base.page'
import { Product } from '../models/product.model'

export class CartPage extends BasePage {
    readonly checkoutButton: Locator
    readonly clearCartButton: Locator
    readonly cartEmptyMessage: Locator

    constructor(page: Page) {
        super(page)
        this.checkoutButton = page.getByRole('link', { name: 'Proceed to checkout' })
        this.clearCartButton = page.getByText('Clear shopping cart')
        this.cartEmptyMessage = page.getByRole('heading', { name: 'YOUR SHOPPING CART IS EMPTY' })
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

    async shouldProductsDisplayInCart(products: Product[]): Promise<void> {
        for (const product of products) {
            await this.shouldProductDisplayInCart(product)
        }
    }

    async clearCart(): Promise<void> {
        await this.clearCartButton.click()
        this.page.on('dialog', dialog => dialog.accept())
    }

    async shouldCartBeEmpty(): Promise<void> {
        await expect(this.cartEmptyMessage).toBeVisible()
    }
}