import { test } from "../../fixtures/test-data.fixture"

test("[TC_10] reviews: submits star rating and content", async ({ loggedInPage, shopPage, productPage, testData }) => {
    await loggedInPage.header.goToShop()

    await shopPage.selectRandomProduct()

    await productPage.selectReviewTab()
    const review = testData.review.getRandom()
    const numberOfReviews = await productPage.getNumberOfReviews()
    await productPage.submitReview(review)
    await productPage.shouldReviewSubmittedCorrectly(review)
    await productPage.shouldNumberOfReviewsCorrectly(numberOfReviews + 1)
})