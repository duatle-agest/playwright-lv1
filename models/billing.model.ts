import { faker } from '@faker-js/faker'

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

    static getRandomData(): Billing {

        return new Billing(
            faker.person.firstName(),
            faker.person.lastName(),
            'United States (US)',
            faker.location.streetAddress(),
            faker.location.city(),
            faker.phone.number(),
            faker.internet.email(),
            faker.company.name(),
            faker.location.zipCode(),
            faker.helpers.arrayElement([
                'Please deliver during business hours',
                'Leave at the front door',
                'Call upon arrival',
                'Standard delivery is fine',
                undefined
            ])
        )
    }
}