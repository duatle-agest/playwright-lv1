import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './base-page'
import { Product } from '../models/product'

export class CartPage extends BasePage {
    readonly cartItems: Locator
    readonly checkoutButton: Locator

    constructor(page: Page) {
        super(page)
        this.cartItems = page.locator('.cart-item')
        this.checkoutButton = page.getByRole('link', { name: 'Proceed to checkout' })
    }

    async isProductInCart(product: Product): Promise<boolean> {
        const row = this.page.getByRole('row').filter({ hasText: product.getName() })
        const priceLocator = row.getByText(product.getPrice())

        return await priceLocator.isVisible()
    }
}