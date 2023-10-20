import { fetchWithRateLimit } from "./fetch-rate-limiter.mjs"

const fetch = fetchWithRateLimit([429], 1000)


function myFetch(URL) {
    return fetch(URL)
        .then(toJson)
}


// function myFetch(URL) {
//     Promise.resolve(event)
// }





const EVENT_URL = "https://app.ticketmaster.com/discovery/v2/events/Z698xZ2qZa6y5?apikey=Lgo461irQS3uQG2zLuV2tSksLMnxNIrF"
 
function toJson(rsp) {
    console.log(rsp.status)
    return rsp.json()       // Promise<Object>
}

function makeRequest() {
    myFetch(EVENT_URL)     // Promise<Object>
    .then(o => console.log(o.name))
}

let a = [0,0,0,0,0]

a.forEach(_ => makeRequest())


