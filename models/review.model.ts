export class Review {
    readonly content: string
    readonly star: number

    constructor(content: string, star: number) {
        this.content = content
        this.star = star
    }

}