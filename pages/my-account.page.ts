import { expect, Locator, Page } from "@playwright/test"
import { BasePage } from "./base.page"
import { Account } from "../models/account.model"

export class MyAccountPage extends BasePage {
    readonly usernameTextbox: Locator
    readonly passwordTextbox: Locator
    readonly loginButton: Locator
    readonly ordersLink: Locator
    readonly orderColumnHeader: Locator

    constructor(page: Page) {
        super(page)
        this.usernameTextbox = this.page.getByRole('textbox', { name: 'Username or email address *' })
        this.passwordTextbox = this.page.getByRole('textbox', { name: 'Password *' })
        this.loginButton = this.page.getByRole('button', { name: 'Log in' })
        this.ordersLink = this.page.getByRole('link', { name: ' Orders' })
        this.orderColumnHeader = this.page.getByRole('cell', { name: 'ORDER' })
    }

    async login(account: Account): Promise<void> {
        await this.usernameTextbox.fill(account.getUsername())
        await this.passwordTextbox.fill(account.getPassword())
        await this.loginButton.click()
    }

    async goToOrders(): Promise<void> {
        await this.ordersLink.click()
        await this.orderColumnHeader.waitFor({ state: 'visible' })
    }

    async shouldOrdersDisplay(orderNumbers: number[]): Promise<void> {
        for (const orderNumber of orderNumbers) {
            await expect(this.page.getByRole('cell', { name: `#${orderNumber}` })).toBeVisible()
        }
    }
}