import { Page, Locator, expect } from '@playwright/test'
import { Product } from '../models/product.model'
import { BasePage } from './base.page'
import { getRandomLocator } from '../utils/random'

export class ProductCategoryPage extends BasePage {
    readonly products: Locator

    constructor(page: Page) {
        super(page)
        this.products = page.locator('.content-product')
    }

    async shouldProductsDisplayAs(view: 'Grid' | 'List'): Promise<void> {
        await expect(this.page.locator(`.products-${view.toLowerCase()}`)).toBeVisible()
    }

    async switchViewTo(view: 'Grid' | 'List'): Promise<void> {
        await this.page
            .locator(`.switch-${view.toLowerCase()}`)
            .click()
    }
    async selectRandomProduct(): Promise<Product> {
        const product = await getRandomLocator(this.products)
        const name = await product.getByRole('heading').innerText()
        const price = await product.locator('.price').innerText()
        await product.getByRole('heading').click()
        return new Product(name, price)
    }

}