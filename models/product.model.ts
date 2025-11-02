export class Product {
    readonly name: string
    readonly price: string
    private quantity_: number

    constructor(name: string, price: string, quantity_: number = 1) {
        this.name = name
        this.price = price
        this.quantity_ = quantity_
    }

    get quantity(): number {
        return this.quantity_
    }

    set quantity(value: number) {
        if (value < 0)
            throw new Error('Quantity cannot be negative')
        this.quantity_ = value
    }

    plusOne() {
        this.quantity_ += 1
    }

    minusOne() {
        if (this.quantity_ == 0)
            throw new Error('Quantity cannot be negative')
        this.quantity_ -= 1
    }

    getSubtotal(): string {
        const priceValue = parseFloat(this.price.replace(/[$,]/g, ''))
        const subtotal = priceValue * this.quantity_
        return `$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }


}