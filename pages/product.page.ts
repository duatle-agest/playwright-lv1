import { expect, Locator, Page } from "@playwright/test"
import { BasePage } from "./base.page"
import { Review } from "../models/review.model"

export class ProductPage extends BasePage {
    readonly addToCartButton: Locator
    readonly reviewsTab: Locator
    readonly yourReviewTextbox: Locator
    readonly submitReviewButton: Locator

    constructor(page: Page) {
        super(page)
        this.addToCartButton = page.getByRole('button', { name: /Add to cart/ }).nth(0)
        this.reviewsTab = page.getByRole('list').getByRole('link').filter({ hasText: 'REVIEW' })
        this.yourReviewTextbox = page.getByRole('textbox', { name: 'Your review *' })
        this.submitReviewButton = page.getByRole('button', { name: 'Submit' })
    }

    async addProductToCart(): Promise<void> {
        await this.addToCartButton.click()
    }

    async shouldProductAddedSuccessfully(): Promise<void> {
        await this.toast.shouldProductAddedMessageBeVisible()
    }

    async selectReviewTab(): Promise<void> {
        await this.reviewsTab.click()
    }

    async submitReview(review: Review): Promise<void> {
        await this.yourReviewTextbox.fill(review.content)
        await this.page.getByTestId('commentform').getByRole('link').filter({ hasText: review.star.toString() }).click()
        await this.submitReviewButton.click()
    }

    async shouldReviewSubmittedCorrectly(review: Review): Promise<void> {
        await expect(
            this.page.getByTestId('comments')
                .getByRole('listitem')
                .filter({ has: this.page.getByRole('paragraph').filter({ hasText: review.content }) })
                .filter({ has: this.page.getByRole('strong').filter({ hasText: review.star.toString() }) })
        ).toBeVisible()
    }

    async getNumberOfReviews(): Promise<number> {
        const text = await this.reviewsTab.textContent()
        const match = text?.match(/\d+/)
        return match ? parseInt(match[0], 10) : 0
    }

    async shouldNumberOfReviewsCorrectly(number: number): Promise<void> {
        await expect.poll(async () => {
            const text = await this.reviewsTab.textContent()
            return parseInt(text?.match(/\d+/)?.[0] ?? '0')
        }).toBe(number)
    }
}