import { Page, Locator, expect } from '@playwright/test'
import { Product } from '../models/product.model'
import { BasePage } from './base.page'
import { randomLocators } from '../utils/random.util'

export class ShopPage extends BasePage {
    readonly products: Locator

    constructor(page: Page) {
        super(page)
        this.products = page.locator('.content-product')
    }

    async shouldProductsDisplayAs(view: 'Grid' | 'List'): Promise<void> {
        await expect.soft(this.page.locator(`.products-${view.toLowerCase()}`)).toBeVisible()
    }

    async switchViewTo(view: 'Grid' | 'List'): Promise<void> {
        await this.page
            .locator(`.switch-${view.toLowerCase()}`)
            .click()
    }

    async selectRandomProduct(): Promise<Product> {
        const product = randomLocators(1, this.products)[0]
        const name = await product.getByRole('heading').innerText()
        const price = await product.locator('.price').innerText()
        await product.getByRole('heading').click()
        return new Product(name, price)
    }

    async addMultipleRandomProductsToCart(count: number): Promise<Product[]> {
        const selectedProducts = randomLocators(count, this.products)
        const products: Product[] = []

        for (const product of selectedProducts) {
            const name = await product.getByRole('heading').innerText()
            const price = await product.locator('.price').innerText()
            await product.getByRole('link', { name: /^Add\s+[“"](.+?)[”"]\s+to your cart$/i }).click()
            products.push(new Product(name, price))
            this.toast.waitForProductAddedMessage()
            this.toast.waitForProductAddedMessageToDisappear()
        }

        return products

    }
}