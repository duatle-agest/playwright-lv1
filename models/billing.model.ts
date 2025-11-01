
export class Billing {
    readonly firstName: string
    readonly lastName: string
    readonly companyName?: string
    readonly country: string
    readonly streetAddress: string
    readonly city: string
    readonly zipCode?: string
    readonly phone: string
    readonly email: string
    readonly orderNotes?: string

    constructor(firstName: string, lastName: string, country: string, streetAddress: string, city: string, phone: string, email: string, companyName?: string, zipCode?: string, orderNotes?: string) {
        this.firstName = firstName
        this.lastName = lastName
        this.companyName = companyName
        this.country = country
        this.streetAddress = streetAddress
        this.city = city
        this.zipCode = zipCode
        this.phone = phone
        this.email = email
        this.orderNotes = orderNotes
    }


}