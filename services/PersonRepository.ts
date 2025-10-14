import * as fs from 'fs/promises'
import * as path from 'path'
import { Person } from '../Person'

export class PersonRepository {
    private inputPath: string
    private outputPath: string

    constructor(
        inputPath: string = path.join(__dirname, '../data/people.json'),
        outputPath: string = path.join(__dirname, '../data/people.output.json')
    ) {
        this.inputPath = inputPath
        this.outputPath = outputPath
    }

    async loadPeople(): Promise<Person[]> {
        try {
            const fileContent = await fs.readFile(this.inputPath, 'utf-8')
            const jsonData = JSON.parse(fileContent)

            if (!Array.isArray(jsonData)) {
                throw new Error('Invalid data format: expected an array')
            }

            return jsonData.map(item => Person.fromJSON(item))
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
                throw new Error(`Input file not found at: ${this.inputPath}`)
            }
            if (error instanceof SyntaxError) {
                throw new Error(`Invalid JSON format in file: ${this.inputPath}`)
            }
            throw error
        }
    }

    async savePeople(people: Person[]): Promise<void> {
        try {
            const jsonData = people.map(person => person.toJSON())
            await fs.mkdir(path.dirname(this.outputPath), { recursive: true })
            await fs.writeFile(this.outputPath, JSON.stringify(jsonData, null, 2), 'utf-8')
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            throw new Error(`Failed to save people to file: ${this.outputPath}. Error: ${errorMessage}`)
        }
    }
}
