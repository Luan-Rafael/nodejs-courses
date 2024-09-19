import fs from 'node:fs'
import { parse } from 'csv-parse'

const csvPath = new URL('./tasks.csv', import.meta.url)

const readStream = fs.createReadStream(csvPath)

const csvParse = parse({
    delimiter: ','
})

async function run() {
    const lines = readStream.pipe(csvParse)

    for await (const line of lines) {
        const [title, description] = line

        fetch('http://127.0.0.1:3333/tasks', {
            method: "POST",
            body: JSON.stringify(
                {
                    title,
                    description
                }
            )
        })
    }
}

run()