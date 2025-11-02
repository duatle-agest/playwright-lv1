import { Page, Locator, expect } from "@playwright/test"
import { BasePage } from "./base.page"
import { Product } from "../models/product.model"
import { Billing } from "../models/billing.model"
import { PaymentMethod } from "../data/enum.data"

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
    readonly alertMessages: Locator


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
        this.alertMessages = page.getByRole('alert')
    }

    private readonly fieldLabels: Record<string, string> = {
        firstName: 'First name',
        lastName: 'Last name',
        country: 'Country / Region',
        streetAddress: 'Street address',
        city: 'Town / City',
        phone: 'Phone',
        email: 'Email address',
        companyName: 'Company name',
        zipCode: 'ZIP Code',
        orderNotes: 'Order notes'
    }

    private getFieldLabel(field: string): string {
        return this.fieldLabels[field] || field
    }

    async shouldDisplay(): Promise<void> {
        await expect(this.page).toHaveTitle(/Checkout/i)
    }

    async shouldProductDisplayInOrder(product: Product): Promise<void> {
        await expect(this.page.getByRole('row')
            .filter({
                has: this.page.getByRole('cell')
                    .filter({ hasText: product.name })
            })
            .getByRole('cell', { name: product.price })
            .first()
        ).toBeVisible()
    }

    async fillBillingDetails(billing: Billing): Promise<void> {
        await this.firstNameTextbox.clear()
        await this.lastNameTextbox.clear()
        await this.companyTextbox.clear()
        await this.streetAddressTextbox.clear()
        await this.cityTextbox.clear()
        await this.zipCodeTextbox.clear()
        await this.phoneTextbox.clear()
        await this.emailTextbox.clear()
        await this.orderNotesTextbox.clear()
        if (billing.firstName) await this.firstNameTextbox.fill(billing.firstName)
        if (billing.lastName) await this.lastNameTextbox.fill(billing.lastName)
        if (billing.companyName) await this.companyTextbox.fill(billing.companyName)
        if (billing.country) await this.countryCombobox.selectOption(billing.country)
        if (billing.streetAddress) await this.streetAddressTextbox.fill(billing.streetAddress)
        if (billing.city) await this.cityTextbox.fill(billing.city)
        if (billing.zipCode) await this.zipCodeTextbox.fill(billing.zipCode)
        if (billing.phone) await this.phoneTextbox.fill(billing.phone)
        if (billing.email) await this.emailTextbox.fill(billing.email)
        if (billing.orderNotes) await this.orderNotesTextbox.fill(billing.orderNotes)
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

    async selectPaymentMethod(method: PaymentMethod): Promise<void> {
        await this.page.getByRole('radio', { name: method }).check()
    }

    async shouldValidationShowRequiredFieldsErrors(billing: Billing): Promise<void> {
        const missingFields = billing.getMissingRequiredFields()

        for (const field of missingFields) {
            await expect(
                this.alertMessages.getByText(`Billing ${this.getFieldLabel(field)} is a required field.`)
            ).toBeVisible()
        }
    }

    async shouldValidationHighlightRequiredFields(billing: Billing): Promise<void> {
        const missingFields = billing.getMissingRequiredFields()

        for (const field of missingFields) {
            await expect(
                this.page.getByRole('paragraph').filter({ hasText: this.getFieldLabel(field) })
            ).toHaveClass(/woocommerce-invalid/)
        }
    }
}