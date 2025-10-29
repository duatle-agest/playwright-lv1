import { Page, Locator, expect } from '@playwright/test'
import { Product } from '../models/product.model'
import { BasePage } from './base.page'
import { randomInt, randomItemsInList } from '../utils/random.util'

export class ShopPage extends BasePage {
    readonly products: Locator

    constructor(page: Page) {
        super(page)
        this.products = page.locator('.product-details')
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
        const product = this.products.nth(randomInt(0, await this.products.count() - 1))
        const { name, price } = await this.getProductNameAndPrice(product)
        await product.getByRole('heading').click()
        return new Product(name, price)
    }

    async addMultipleRandomProductsToCart(count: number): Promise<Product[]> {
        await this.page.waitForLoadState('networkidle')
        const randomNumbers: number[] = randomItemsInList(count, Array.from({ length: await this.products.count() }, (_, i) => i))
        const products: Product[] = []

        for (const index of randomNumbers) {
            const product = this.products.nth(index)
            const { name, price } = await this.getProductNameAndPrice(product)
            await product.getByRole('link', { name: /^Add\s+[“"](.+?)[”"]\s+to your cart$/i }).click()
            products.push(new Product(name, price))
            await this.toast.waitForProductAddedMessage()
            await this.toast.waitForProductAddedMessageToDisappear()
        }

        return products

    }

    async getProductNameAndPrice(product: Locator): Promise<{ name: string, price: string }> {
        const name = await product.getByRole('heading').innerText()
        const price = await product.locator('.amount').last().innerText()
        return { name, price }
    }
}