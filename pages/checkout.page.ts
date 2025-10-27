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
        this.zipCodeTextbox = page.getByRole('textbox', { name: 'Postcode / ZIP (optional)' })
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
        if (billing.firstName) this.firstNameTextbox.fill(billing.firstName)
        if (billing.lastName) this.lastNameTextbox.fill(billing.lastName);
        if (billing.companyName) this.companyTextbox.fill(billing.companyName);
        if (billing.country) this.countryCombobox.selectOption(billing.country);
        if (billing.streetAddress) this.streetAddressTextbox.fill(billing.streetAddress);
        if (billing.city) this.cityTextbox.fill(billing.city);
        if (billing.zipCode) this.zipCodeTextbox.fill(billing.zipCode);
        if (billing.phone) this.phoneTextbox.fill(billing.phone);
        if (billing.email) this.emailTextbox.fill(billing.email);
        if (billing.orderNotes) this.orderNotesTextbox.fill(billing.orderNotes);
    }

    async getFullBilling(): Promise<Billing> {
        return new Billing({
            firstName: await this.firstNameTextbox.inputValue(),
            lastName: await this.lastNameTextbox.inputValue(),
            companyName: await this.companyTextbox.inputValue(),
            country: await this.countryCombobox.inputValue(),
            streetAddress: await this.streetAddressTextbox.inputValue(),
            city: await this.cityTextbox.inputValue(),
            zipCode: await this.zipCodeTextbox.inputValue(),
            phone: await this.phoneTextbox.inputValue(),
            email: await this.emailTextbox.inputValue(),
            orderNotes: await this.orderNotesTextbox.inputValue()
        })
    }

    async placeOrder(): Promise<void> {
        await this.placeOrderButton.click()
    }

}