
export function fetchWithRateLimit(retryCodes, delay = 500) {
    return async function internalFetch(resource, options) {
        return fetch(resource, options)
            .then(retryIfRateLimit)
        

        function retryIfRateLimit(rsp) {
            if(retryCodes.includes(rsp.status)) {
                console.log(`Status code ${rsp.status} for request ${resource}. Retrying in ${delay} ms`)
                return new Promise((resolve, reject) => {
                    setTimeout(() => resolve(internalFetch(resource, options)))
                })
            }
            return rsp
        }

    }

}
