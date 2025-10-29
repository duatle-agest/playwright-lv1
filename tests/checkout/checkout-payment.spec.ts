import { test } from '../../fixtures/page.fixture'
import { SortType } from '../../pages/shop.page'

test("[TC_03] checkout: pays with direct bank transfer successfully", async ({ loggedInPage, shopPage }) => {
    await loggedInPage.header.goToShop()

    await shopPage.switchViewTo('List')
    await shopPage.sortBy(SortType.PRICE_LOW_TO_HIGH)
    await shopPage.shouldProductsBeSortedBy(SortType.PRICE_LOW_TO_HIGH)
    await shopPage.sortBy(SortType.PRICE_HIGH_TO_LOW)
    await shopPage.shouldProductsBeSortedBy(SortType.PRICE_HIGH_TO_LOW)
})