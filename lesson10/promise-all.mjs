const eventIdsStr = `
{
    "event-ids" : [
        "Z698xZ2qZa6y5",
        "Z698xZ2qZaFHl",
        "G5vYZ9svBCs1O",
    ]
 }
 `
















const events = JSON.parse(eventIdsStr)



const objPromises =  events["event-ids"]        // String[]
                        .map(makeHttpRequest)   // Promise<Object>[]


// (String) -> Promise<Object>
function makeHttpRequest(eventId) {   
}


// Promise<Object>[] -> Promise<Object[]>
function all(promises) {
    return new Promise((resolve, reject) =>  {
        const objs = []
        let cnt = 0

        promises.forEach(processPromise)
    
        function processPromise(p, idx) {
            p.then(o => {
                objs[idx] = o
                if(cnt++ == promises.length) {
                    resolve(objs)
                } 

            }).catch(e => reject(e))
        }    
    })
}


function race(promises) {
    return new Promise((resolve, reject) =>  {
        promises.forEach(processPromise)
    
        function processPromise(p) {
            p.then(resolve)
            .catch(reject)
        }    
    })
}


function any(promises) {
    return new Promise((resolve, reject) =>  {
        let cnt = 0

        promises.forEach(processPromise)
    
        function processPromise(p) {
            p.then(resolve)
            .catch(e => {
                if(cnt++ == promises.length)
                    reject(e)
            }
            )
        }    
    })
}






all(objPromises)
    .then(writeToFile)





Promise.all(objPromises)
    .then(writeToFile)


function writeToFile(objs) {
    const jsonStr = JSON.stringify(objs)
}


// (Promise<Object>[]) -> Promise<Object[]>
function arrayOfPromisesToPromiseOfArray(promises) {  
    const objs  = []
    let cnt = 0

    return new Promise((resolve, reject) => {
        promises.array
            .forEach((p, idx) => p.then(o => onPromiseCompleted(o, idx))
                           .catch(onPromiseRejected))

        function onPromiseCompleted(o, idx){
            objs[idx] = o
            if(cnt++ == promises.length) {
                resolve(objs)
            }
        }

        function onPromiseCompleted(e){
            reject(e)
        }
    })
}

// (Promise<Object>, Promise<Object>) -> Promise<Object[]>  

function twoPromisesToOne(p1, p2) {
    
}

