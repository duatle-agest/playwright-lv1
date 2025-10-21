import { Locator, Page } from "@playwright/test"
import { Header } from "./components/header"

export class BasePage {
    protected readonly page: Page
    readonly header: Header

    constructor(page: Page) {
        this.page = page
        this.header = new Header(page)
    }
}