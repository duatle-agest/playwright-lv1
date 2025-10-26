import { Page, Locator, expect } from "@playwright/test"
import { BasePage } from "./base.page"
import { Product } from "../models/product.model"
import { Billing } from "../models/billing.model"

export class OrderStatusPage extends BasePage {
    readonly billingDetailsSection: Locator
    readonly orderConfirmationMessage: Locator

    constructor(page: Page) {
        super(page)
        this.billingDetailsSection = page.getByRole('generic').filter({ has: page.getByRole('heading', { name: 'Billing Address' }) })
        this.orderConfirmationMessage = page.getByText('Thank you. Your order has been received.')
    }

    async shouldDisplay(): Promise<void> {
        await expect(this.page).toHaveURL(/\/order-received/i)
    }

    async shouldProductDisplayInOrder(product: Product): Promise<void> {
        await expect(this.page.getByRole('row')
            .filter({
                has: this.page.getByRole('cell')
                    .filter({ hasText: product.getName() })
            })
            .getByRole('cell', { name: product.getPrice() }).nth(0)
        ).toBeVisible()
    }

    async shouldProductsDisplayInOrder(products: Product[]): Promise<void> {
        for (const product of products) {
            await this.shouldProductDisplayInOrder(product)
        }
    }

    async shouldBillingDetailsDisplayCorrectly(expectedBilling: Billing): Promise<void> {
        if (expectedBilling.firstName) expect(this.page.getByText(expectedBilling.firstName).first()).toBeVisible()
        if (expectedBilling.lastName) expect(this.page.getByText(expectedBilling.lastName).first()).toBeVisible()
        if (expectedBilling.companyName) expect(this.page.getByText(expectedBilling.companyName).first()).toBeVisible()
        if (expectedBilling.country) expect(this.page.getByText(expectedBilling.country).first()).toBeVisible()
        if (expectedBilling.streetAddress) expect(this.page.getByText(expectedBilling.streetAddress).first()).toBeVisible()
        if (expectedBilling.city) expect(this.page.getByText(expectedBilling.city).first()).toBeVisible()
        if (expectedBilling.phone) expect(this.page.getByText(expectedBilling.phone).first()).toBeVisible()
        if (expectedBilling.email) expect(this.page.getByText(expectedBilling.email).first()).toBeVisible()
        if (expectedBilling.orderNotes) expect(this.page.getByText(expectedBilling.orderNotes).first()).toBeVisible()
    }

    async shouldOrderConfirmationMessageDisplayCorrectly(): Promise<void> {
        await expect(this.orderConfirmationMessage).toBeVisible()
    }

}