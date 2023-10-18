
const URL = "https://api.chucknorris.io/jokes/mdtKGns-QgSMtKPCSRnrNA"
const URL1 = "https://api.chucknorris.io/jokes/mdtKGns-QgSMtKPCSRnrNA"
//const URL1 = "https://eloquentjavascript.net/11_async.html"

function processResponse(text) {
    console.log(text.length)

}

fetch(URL)  // Promise<Response>
    .then(rsp => rsp.text() )                          // Promise<String>
    .then(text => { console.log(text); return text} )                  // Promise<String>
    .then(text => text.length)                         // Promise<Number>
    .then(len => console.log(len))                     // Promise<undefined>


const p1 = fetch(URL)   // Promise<Response>
const p2 = fetch(URL1)   // Promise<Response>

// p1  // Promise<Response>
//     .then(rsp => rsp.text() )                          // Promise<String>
//     .then(text => text.length)                         // Promise<Number>
//     .then(len => {                                     // Promise<Number>
//         return p2
//             .then(rsp => rsp.text() )                          // Promise<String>
//             .then(text => text.length)                         // Promise<Number>
//             .then(len1 => len+len1)                            // Promise<Number>
//     })
//     .then(total => console.log(total))

function promiseResponseToNumber(p1) {
    return p1  // Promise<Response>
    .then(rsp => rsp.text() )                          // Promise<String>
    .then(text => text.length)                         // Promise<Number>
}

// promiseResponseToNumber(p1)                             // Promise<Number>
//     .then(
//         len => promiseResponseToNumber(p2)              // Promise<Number>
//                 .then(len1 => len+len1)                 // Promise<Number>
//         )
//     .then(total => console.log(total))


function combineTwoPromiseNumbers(p1, p2, combiner) {
    return promiseResponseToNumber(p1)                             // Promise<Number>
        .then(
            len => promiseResponseToNumber(p2)              // Promise<Number>
                .then(len1 => combiner(len, len1))                 // Promise<Number>
        )
        .catch(e => console.log(e))


}

async function combineTwoPromiseNumbers(p1, p2, combiner) {
    try {
    const len1 =  await p1
    const len2 = await p2
    return combiner(len1, len2)
    } catch (e) {
        console.log(e)
    }
}

async function f() { 
    return Promise.resolve(10)
}


combineTwoPromiseNumbers(p1, p2, (l1, l2) => l1 + l2 )
    .then(total => console.log(total))





// Synchronous version: NOT POSSIBLE IN JAVASCRIPT. This is just an equivalent model
// const rsp = fetch('https://eloquentjavascript.net/11_async.html') // Response
// const text = rsp.text()                                           // String  
// const len = text.length                                           // Number  
// console.log(len)                                                  // undefined  


// Using async/await
const rsp = await fetch('https://eloquentjavascript.net/11_async.html') // Response
const text = await rsp.text()                                           // String  
const len = text.length                                           // Number  
console.log(len)                                                  // undefined  



// let len1 = await fetch('https://eloquentjavascript.net/11_async.html')
//     .then(rsp => rsp.text())                            // Promise<String>
//     .then(text => text.length)                          // Promise<Number>
    

//     let len2  = await fetch('https://eloquentjavascript.net/11_async.html')
//     .then(rsp => rsp.text())                            // Promise<String>
//     .then(text => text.length)                          // Promise<Number>
    
    
//     // let len1 = await p1 
//     // let len2 = await p2 
    
//     console.log(len1+len2)
    
//     join2Promises(p1, p2)
//     .then(sum =>  console.log(sum))
    
    
//     function join2Promises(p1, p2) {
//         return p1.then(
//             function (v1) {
//                 return p2.then(function (v2)  { 
//                     return v1 + v2
//                 })
//             }
//     )
// }

console.log('Nothing more to do')

