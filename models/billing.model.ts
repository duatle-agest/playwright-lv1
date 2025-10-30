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
        const firstNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William']
        const lastNames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Anderson']
        const companies = ['Tech Corp', 'Global Industries', 'Solutions Inc', 'Innovations Ltd']
        const cities = ['Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia']
        const streets = ['Oak Avenue', 'Maple Street', 'Cedar Lane', 'Pine Road', 'Elm Boulevard']

        const randomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]
        const randomZip = () => String(10000 + Math.floor(Math.random() * 90000))
        const randomPhone = () => `+1-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`

        return new Billing(
            randomElement(firstNames),
            randomElement(lastNames),
            'United States (US)',
            `${Math.floor(Math.random() * 1000) + 1} ${randomElement(streets)}`,
            randomElement(cities),
            randomPhone(),
            `${randomElement(firstNames).toLowerCase()}.${randomElement(lastNames).toLowerCase()}@example.com`,
            randomElement(companies),
            randomZip(),
            'Standard delivery is fine'
        )
    }
}