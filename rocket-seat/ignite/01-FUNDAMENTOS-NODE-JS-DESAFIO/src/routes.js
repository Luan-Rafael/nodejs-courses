import { randomUUID } from 'node:crypto'

import { buildRoutePath } from "./utils/build-route-path.js"
import { DataBase } from './database.js'

const database = new DataBase()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath("/tasks"),
        handler: (req, res) => {
            const { search } = req.query

            const tasks = database.select('tasks', search ? { title: search } : null)

            return res.end(JSON.stringify({ tasks }))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath("/tasks"),
        handler: (req, res) => {
            const { title, description } = req.body

            if (!(title && description)) {
                return res.writeHead(400).end()
            }

            const newTask = {
                id: randomUUID(),
                title,
                description,
                created_at: new Date(),
                completed_at: null,
                updated_at: new Date(),
            }

            database.insert('tasks', newTask)
            return res.writeHead(201).end()

        }
    },
    {
        method: 'PUT',
        path: buildRoutePath("/tasks/:id"),
        handler: (req, res) => {
            const { id } = req.params
            const { title, description } = req.body


            if (!(title && description)) {
                return res.writeHead(400).end()
            }

            const task = database.selectById('tasks', id)

            if (task) {

                const taskUpdated = {
                    ...task,
                    title: title,
                    description: description,
                    updated_at: new Date()
                }

                database.update('tasks', id, taskUpdated)

                return res.writeHead(201).end()
            }

            return res.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath("/tasks/:id"),
        handler: (req, res) => {
            const { id } = req.params

            const task = database.selectById('tasks', id)

            if (task) {
                database.delete('tasks', id)
                return res.writeHead(201).end()
            }

            return res.writeHead(204).end()
        }
    },
    {
        method: "PATCH",
        path: buildRoutePath("/tasks/:id/complete"),
        handler: (req, res) => {
            const { id } = req.params
            const task = database.selectById('tasks', id)

            if (task) {
                database.update('tasks', id, { ...task, completed_at: new Date() })
                return res.writeHead(201).end()
            }

            return res.writeHead(204).end()
        }
    },
    {
        method: "POST",
        path: buildRoutePath("/tasks/bulk"),
        handler: async (req, res) => {
            const chunks = []
            console.log(req)
            for await (const chunk of req) {
                chunks.push(chunk)
            }

            const dataInBulk = Buffer.concat(chunks).toString()

            console.log(dataInBulk)

            return res.end()
        }
    }
]