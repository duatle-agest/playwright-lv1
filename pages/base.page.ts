import { Page } from "@playwright/test"
import { Header } from "./components/header.component"
import { Toast } from "./components/toast.component"

export class BasePage {
    protected readonly page: Page
    readonly header: Header
    readonly toast: Toast

    constructor(page: Page) {
        this.page = page
        this.header = new Header(page)
        this.toast = new Toast(page)
    }
}