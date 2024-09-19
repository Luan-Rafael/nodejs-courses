export function extractQueryParams(query) {
    return query.substr(1).split('&').reduce((acc, curr) => {
        const [key, value] = curr.split('=')
        acc[key] = value
        return acc
    }, {})
}