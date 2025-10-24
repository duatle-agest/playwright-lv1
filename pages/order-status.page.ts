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
            .getByRole('cell', { name: product.getPrice() })
        ).toBeVisible()
    }

    async shouldBillingDetailsDisplayCorrectly(expectedBilling: Billing): Promise<void> {
        const content = await this.billingDetailsSection.innerText()
        if (expectedBilling.firstName) content.includes(expectedBilling.firstName)
        if (expectedBilling.lastName) content.includes(expectedBilling.lastName);
        if (expectedBilling.companyName) content.includes(expectedBilling.companyName);
        if (expectedBilling.country) content.includes(expectedBilling.country);
        if (expectedBilling.streetAddress) content.includes(expectedBilling.streetAddress);
        if (expectedBilling.city) content.includes(expectedBilling.city);
        if (expectedBilling.zipCode) content.includes(expectedBilling.zipCode);
        if (expectedBilling.phone) content.includes(expectedBilling.phone);
        if (expectedBilling.email) content.includes(expectedBilling.email);
        if (expectedBilling.orderNotes) content.includes(expectedBilling.orderNotes);
    }

    async shouldOrderConfirmationMessageDisplayCorrectly(): Promise<void> {
        await expect(this.orderConfirmationMessage).toBeVisible()
    }

}