import http from 'node:http'
import { routes } from './routes.js'
import { json } from './middlewares/json.js'
import { extractQueryParams } from './utils/extract-query-params.js'


const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    const route = routes.find(route => route.method === method && route.path.test(url))

    if (route) {
        const { query, ...params } = url.match(route.path).groups

        req.query = query ? extractQueryParams(query) : {}
        console.log(req.query)
        req.params = params

        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(3333)