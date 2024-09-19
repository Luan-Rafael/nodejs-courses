export function extractQueryParams(query) {
    console.log(String(query).substring(1))
    return String(query).substring(1)
        .split('&')
        .reduce((acc, queryParam) => {
            const [key, value] = queryParam.split('=')
            acc[key] = value
            return acc
        }, {})
}