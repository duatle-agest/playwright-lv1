import { Page, Locator, expect } from "@playwright/test"
import { BasePage } from "./base.page"
import { Product } from "../models/product.model"
import { Billing } from "../models/billing.model"

export class CheckoutPage extends BasePage {
    readonly firstNameTextbox: Locator
    readonly lastNameTextbox: Locator
    readonly companyTextbox: Locator
    readonly countryCombobox: Locator
    readonly streetAddressTextbox: Locator
    readonly cityTextbox: Locator
    readonly zipCodeTextbox: Locator
    readonly phoneTextbox: Locator
    readonly emailTextbox: Locator
    readonly orderNotesTextbox: Locator
    readonly placeOrderButton: Locator

    constructor(page: Page) {
        super(page)
        this.firstNameTextbox = page.getByRole('textbox', { name: 'First name *' })
        this.lastNameTextbox = page.getByRole('textbox', { name: 'Last name *' })
        this.companyTextbox = page.getByRole('textbox', { name: 'Company name (optional)' })
        this.countryCombobox = page.locator('#billing_country')
        this.streetAddressTextbox = page.getByRole('textbox', { name: 'Street address *' })
        this.cityTextbox = page.getByRole('textbox', { name: 'Town / City *' })
        this.zipCodeTextbox = page.getByRole('textbox', { name: 'ZIP Code *' })
        this.phoneTextbox = page.getByRole('textbox', { name: 'Phone *' })
        this.emailTextbox = page.getByRole('textbox', { name: 'Email address *' })
        this.orderNotesTextbox = page.getByRole('textbox', { name: 'Order notes (optional)' })
        this.placeOrderButton = page.getByRole('button', { name: 'Place order' })
    }

    async shouldDisplay(): Promise<void> {
        await expect(this.page).toHaveTitle(/Checkout/i)
    }

    async shouldProductDisplayInOrder(product: Product): Promise<void> {
        await expect(this.page.getByRole('row')
            .filter({
                has: this.page.getByRole('cell')
                    .filter({ hasText: product.getName() })
            })
            .getByRole('cell', { name: product.getPrice() })
            .first()
        ).toBeVisible()
    }

    async fillBillingDetails(billing: Billing): Promise<void> {
        if (billing.firstName) await this.firstNameTextbox.fill(billing.firstName)
        if (billing.lastName) await this.lastNameTextbox.fill(billing.lastName);
        if (billing.companyName) await this.companyTextbox.fill(billing.companyName);
        if (billing.country) await this.countryCombobox.selectOption(billing.country);
        if (billing.streetAddress) await this.streetAddressTextbox.fill(billing.streetAddress);
        if (billing.city) await this.cityTextbox.fill(billing.city);
        if (billing.zipCode) await this.zipCodeTextbox.fill(billing.zipCode);
        if (billing.phone) await this.phoneTextbox.fill(billing.phone);
        if (billing.email) await this.emailTextbox.fill(billing.email);
        if (billing.orderNotes) await this.orderNotesTextbox.fill(billing.orderNotes);
    }

    async getFullBilling(): Promise<Billing> {
        return new Billing(
            await this.firstNameTextbox.inputValue(),
            await this.lastNameTextbox.inputValue(),
            await this.countryCombobox.inputValue(),
            await this.streetAddressTextbox.inputValue(),
            await this.cityTextbox.inputValue(),
            await this.phoneTextbox.inputValue(),
            await this.emailTextbox.inputValue(),
            await this.companyTextbox.inputValue(),
            await this.zipCodeTextbox.inputValue(),
            await this.orderNotesTextbox.inputValue()
        )
    }

    async placeOrder(): Promise<void> {
        await this.placeOrderButton.click()
    }

}