import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './base.page'
import { Product } from '../models/product.model'

export class CartPage extends BasePage {
    readonly checkoutButton: Locator
    readonly clearCartButton: Locator
    readonly cartEmptyMessage: Locator
    readonly cardUpdatedMessage: Locator

    constructor(page: Page) {
        super(page)
        this.checkoutButton = page.getByRole('link', { name: 'Proceed to checkout' })
        this.clearCartButton = page.getByText('Clear shopping cart')
        this.cartEmptyMessage = page.getByRole('heading', { name: 'YOUR SHOPPING CART IS EMPTY' })
        this.cardUpdatedMessage = page.getByText('Cart updated.')
    }

    async shouldProductDisplayInCart(product: Product): Promise<void> {
        await expect(this.getProductRow(product.name)
            .getByRole('cell', { name: product.price })
            .first()
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

    private getProductRow(productName): Locator {
        return this.page.getByRole('row')
            .filter({
                has: this.page.getByRole('cell')
                    .filter({ hasText: productName })
            })
    }

    async shouldProductQuantityAndSubtotalCorrectly(product: Product): Promise<void> {
        const productRow = this.getProductRow(product.name)
        await expect(productRow.getByRole('spinbutton')).toHaveValue(product.quantity.toString())
        await expect(productRow.getByRole('cell', { name: '$' }).nth(1)).toHaveText(product.getSubtotal())
    }

    async plusProductQuantity(product: Product, amount: number = 1): Promise<void> {
        const productRow = this.getProductRow(product.name)
        for (let i = 0; i < amount; i++) {
            product.plusOne()
            await productRow.locator('.plus').click()
        }
        await this.header.productLoading.waitFor({ state: 'visible' })
        await this.header.productLoading.waitFor({ state: 'hidden' })
    }

    async minusProductQuantity(product: Product, amount: number = 1): Promise<void> {
        const productRow = this.getProductRow(product.price)
        for (let i = 0; i < amount; i++) {
            product.minusOne()
            await productRow.locator('.minus').click()
        }
        await this.header.productLoading.waitFor({ state: 'visible' })
        await this.header.productLoading.waitFor({ state: 'hidden' })
    }

    async fillProductQuantity(product: Product, amount: number): Promise<void> {
        product.quantity = amount
        const productRow = this.getProductRow(product.price)
        await productRow.getByRole('spinbutton').fill(amount.toString())
        await productRow.getByRole('spinbutton').press('Enter')
        await this.header.productLoading.waitFor({ state: 'visible' })
        await this.header.productLoading.waitFor({ state: 'hidden' })
    }
}