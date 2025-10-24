import { Locator, Page } from "@playwright/test"
import { BasePage } from "./base.page"
import { Account } from "../models/account.model"

export class MyAccountPage extends BasePage {
    readonly usernameTextbox: Locator
    readonly passwordTextbox: Locator
    readonly loginButton: Locator

    constructor(page: Page) {
        super(page)
        this.usernameTextbox = this.page.getByRole('textbox', { name: 'Username or email address *' })
        this.passwordTextbox = this.page.getByRole('textbox', { name: 'Password *' })
        this.loginButton = this.page.getByRole('button', { name: 'Log in' })
    }

    async login(account: Account): Promise<void> {
        await this.usernameTextbox.fill(account.getUsername())
        await this.passwordTextbox.fill(account.getPassword())
        await this.loginButton.click()
    }

}