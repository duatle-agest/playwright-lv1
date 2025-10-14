import { PersonRepository } from './services/PersonRepository'

async function main() {
    try {
        const repository = new PersonRepository()

        console.log('Loading people from JSON...')
        const people = await repository.loadPeople()

        people.forEach((person, index) => {
            person.celebrateBirthday()
            console.log(person.greet())
            console.log(`Adult: ${person.isAdult()}`)
        })

        console.log('\nSaving updated people to people.output.json...')
        await repository.savePeople(people)
        console.log('Done!')

    } catch (error) {
        console.error('Error:', error instanceof Error ? error.message : 'An unknown error occurred')
        process.exit(1)
    }
}

main()
