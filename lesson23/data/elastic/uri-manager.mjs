const URI_PREFIX='http://localhost:9200/'


export default function(index) {
    return {
        getAll: () => `${URI_PREFIX}${index}/_search`,
        get: (id) => `${URI_PREFIX}${index}/_doc/${id}`,
        create: () => `${URI_PREFIX}${index}/_doc/?refresh=wait_for`,
        update: (id) => `${URI_PREFIX}${index}/_doc/${id}?refresh=wait_for`,
        delete: (id) => `${URI_PREFIX}${index}/_doc/${id}?refresh=wait_for`,
    }
}
