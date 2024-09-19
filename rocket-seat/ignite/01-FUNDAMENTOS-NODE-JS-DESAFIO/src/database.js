
import fs from 'node:fs/promises'
import { URL } from 'node:url'


const dataBasePath = new URL('../db.json', import.meta.url)

export class DataBase {
    #database = {}

    constructor() {
        fs.readFile(dataBasePath, 'utf8')
            .then((file) => this.#database = JSON.parse(file))
            .catch(() => this.#persist())
    }

    async #persist() {
        fs.writeFile(dataBasePath, JSON.stringify(this.#database))
    }

    select(table, search) {
        let data = this.#database[table] ?? []

        if (search) {
            data = data.filter(task => Object.entries(search).
                some(([key, value]) => String(task[key]).toLowerCase().includes(String(value).toLowerCase())))
        }

        return data
    }

    selectById(table, id) {
        return this.select(table, { id })[0]
    }

    insert(table, data) {

        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()
    }

    update(table, id, data) {
        console.log(data)
        const index = this.#database[table].findIndex(row => row.id === id)

        if (index > -1) {
            this.#database[table].splice(index, 1, { id, ...data })
            this.#persist()
        }
    }

    delete(table, id) {
        const index = this.#database[table].findIndex(row => row.id === id)

        if (index > -1) {
            this.#database[table].splice(index, 1)
            this.#persist()
        }
    }

}