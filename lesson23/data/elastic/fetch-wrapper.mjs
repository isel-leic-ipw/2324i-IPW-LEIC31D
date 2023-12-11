export async function get(uri) {
    return fetchInternal(uri)
}

export async function del(uri) {
    return fetchInternal(uri, { method: "DELETE" })
}

export async function put(uri, body) {
    return fetchInternal(uri, { method: "PUT" }, body)
}

export async function post(uri, body) {
    return fetchInternal(uri, { method: "POST"}, body)
}


async function fetchInternal(uri, options = { }, body = undefined) {
    if(body) {
        options.headers = {
            'Content-Type': 'application/json'
        }
        options.body = JSON.stringify(body)
    }

    //console.log(`Fetching from ${uri} with these options`, options)

    return fetch(uri, options)
        .then(response => response.json())
        .then(showResponse)

    // const rsp = await fetch(uri, options)
    // const obj = await rsp.json()
    // console.log(obj)
    // return obj


    function showResponse(body) {
        console.log(`Received from ${uri}`)
        console.log(body)

        return body
    }
}
