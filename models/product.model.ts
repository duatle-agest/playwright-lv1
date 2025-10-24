export class Product {
    readonly name: string
    readonly price: string

    constructor(name: string, price: string) {
        this.name = name
        this.price = price
    }

    getName(): string {
        return this.name
    }

    getPrice(): string {
        return this.price
    }

}