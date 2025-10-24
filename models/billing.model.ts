export class Billing {
    readonly firstName: string
    readonly lastName: string
    readonly companyName: string
    readonly country: string
    readonly streetAddress: string
    readonly city: string
    readonly zipCode: string
    readonly phone: string
    readonly email: string
    readonly orderNotes: string

    constructor(init: Partial<Billing>) {
        Object.assign(this, init)
    }


}