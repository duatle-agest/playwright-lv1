import { Page, Locator } from "@playwright/test"
import { BasePage } from "./base-page"
import { Product } from "../models/product"
import { Billing } from "../models/billing"

export class OrderStatusPage extends BasePage {
    readonly billingDetailsSection: Locator
    readonly orderConfirmationMessage: Locator

    constructor(page: Page) {
        super(page)
        this.billingDetailsSection = page.locator('woocommerce-customer-details')
        this.orderConfirmationMessage = page.getByText('Thank you. Your order has been received.')
    }

    async isProductInOrder(product: Product): Promise<boolean> {
        const row = this.page.getByRole('row').filter({ hasText: product.getName() })
        const priceLocator = row.getByText(product.getPrice())

        return await priceLocator.isVisible()
    }

    async assertBillingDetails(expectedBilling: Billing): Promise<void> {
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
}