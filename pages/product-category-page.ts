import { Page, Locator, expect } from '@playwright/test'
import { Product } from '../models/product'
import { BasePage } from './base-page'

export class ProductCategoryPage extends BasePage {
    readonly productsView: Locator
    readonly switchListViewLink: Locator
    readonly switchGridViewLink: Locator
    readonly productNames: Locator
    readonly productPrices: Locator

    constructor(page: Page) {
        super(page)
        this.productsView = page.locator('.products')
        this.switchListViewLink = page.locator('.switch-list')
        this.switchGridViewLink = page.locator('.switch-grid')
        this.productNames = this.productsView.getByRole('heading')
        this.productPrices = this.productsView.locator('.price')
    }

    /**
     * Check if products are displayed in grid view
     * @returns boolean
     */
    async isGridView(): Promise<boolean> {
        const classes = await this.productsView.getAttribute('class') || ''
        return classes.includes('products-grid')
    }

    /**
     * Check if products are displayed in list view
     * @returns boolean
     */
    async isListView(): Promise<boolean> {
        const classes = await this.productsView.getAttribute('class') || ''
        return classes.includes('products-list')
    }

    async selectRandomProduct(): Promise<Product> {
        const count = await this.productNames.count()
        const randomIndex = Math.floor(Math.random() * count)
        const name = await this.productNames.nth(randomIndex).innerText()
        const price = await this.productPrices.nth(randomIndex).innerText()
        const product = new Product(name, price)
        await this.productNames.nth(randomIndex).click()
        return product
    }

}