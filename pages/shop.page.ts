import { Page, Locator, expect } from '@playwright/test'
import { Product } from '../models/product.model'
import { BasePage } from './base.page'
import { randomInt, randomItemsInList } from '../utils/random.util'
import { SortType } from '../data/enum.data'

export class ShopPage extends BasePage {
    readonly products: Locator
    readonly sortComboBox: Locator
    readonly productLoader: Locator

    constructor(page: Page) {
        super(page)
        this.products = page.locator('.product-details')
        this.sortComboBox = page.getByRole('combobox', { name: 'Shop order' })
        this.productLoader = page.locator('.et-loader.product-ajax')
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

    async addRandomProductToCart(): Promise<Product> {
        await this.page.waitForLoadState('networkidle')
        const index = randomInt(0, await this.products.count() - 1)
        return this.addProductToCartByIndex(index)
    }

    async addMultipleRandomProductsToCart(count: number): Promise<Product[]> {
        await this.page.waitForLoadState('networkidle')
        const randomNumbers: number[] = randomItemsInList(count, Array.from({ length: await this.products.count() }, (_, i) => i))
        const products: Product[] = []

        for (const index of randomNumbers) {
            const product = await this.addProductToCartByIndex(index)
            products.push(product)
        }

        return products

    }

    private async addProductToCartByIndex(index: number): Promise<Product> {
        const product = this.products.nth(index)
        const { name, price } = await this.getProductNameAndPrice(product)
        await product.getByRole('link', { name: /^Add\s+[“"](.+?)[”"]\s+to your cart$/i }).click()
        await this.toast.waitForProductAddedMessage()
        await this.toast.waitForProductAddedMessageToDisappear()
        return new Product(name, price)
    }

    private async getProductNameAndPrice(product: Locator): Promise<{ name: string, price: string }> {
        const name = await product.getByRole('heading').innerText()
        const price = await product.locator('.amount').last().innerText()
        return { name, price }
    }

    async sortBy(sortType: SortType): Promise<void> {
        await this.page.waitForLoadState('networkidle')
        await this.sortComboBox.selectOption({ label: sortType })
        await this.productLoader.waitFor({ state: 'hidden' })
    }

    async shouldProductsBeSortedBy(sortType: SortType.PRICE_LOW_TO_HIGH | SortType.PRICE_HIGH_TO_LOW): Promise<void> {
        const prices: number[] = []
        const allProducts = await this.products.all();
        for (const product of allProducts) {
            const priceText = await product.locator('.amount').last().innerText()
            const priceNumber = parseFloat(priceText.replace(/[^0-9.-]+/g, ''))
            prices.push(priceNumber)
        }

        const sortedPrices = [...prices].sort((a, b) => a - b)
        switch (sortType) {
            case SortType.PRICE_LOW_TO_HIGH:
                expect(prices).toEqual(sortedPrices)
                break
            case SortType.PRICE_HIGH_TO_LOW:
                expect(prices).toEqual(sortedPrices.reverse())
                break
            default:
                break
        }
    }
}