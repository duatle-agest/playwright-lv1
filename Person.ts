export class Person {
    private name: string
    private age: number
    private city: string

    constructor(name: string, age: number, city: string) {
        if (!name || name.trim() === "") {
            throw new Error("Name cannot be empty.")
        }
        if (age <= 0) {
            throw new Error("Age must be positive.")
        }
        this.name = name
        this.age = age
        this.city = city
    }

    greet(): string {
        return `Hi, I'm ${this.name} from ${this.city}.`
    }

    celebrateBirthday() {
        this.age += 1
    }

    updateCity(newCity: string) {
        this.city = newCity
    }

    isAdult(): boolean {
        return this.age >= 18
    }

    hasSameCity(other: Person): boolean {
        return this.city === other.city
    }

    getName(): string {
        return this.name;
    }

    getAge(): number {
        return this.age;
    }

    getCity(): string {
        return this.city;
    }

    toJSON(): object {
        return {
            name: this.name,
            age: this.age,
            city: this.city
        }
    }

    static fromJSON(data: any): Person {
        if (!data || typeof data !== 'object') {
            throw new Error("Invalid data for Person.")
        }
        return new Person(data.name, data.age, data.city)
    }
}
