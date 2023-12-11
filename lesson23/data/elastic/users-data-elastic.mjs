// Module manages application users data.
// In this specific module, data is stored ElasticSearch


const NUM_USERS = 2    

let USERS = new Array(NUM_USERS).fill(0, 0, NUM_USERS)
    .map((_, idx) => { 
        return {
            id: idx,
            username: `User${idx}`,
            email: `User${idx}@slb.pt`,
            password: `Pass${idx}`,
            token: "ef604e80-a351-4d13-b78f-c888f3e63b6" + idx
        } 
    })



export async function getUserByToken(token) {
    const uriUserDocument = ""
    let resp = await fetch(uriUserDocument)
    let obj = await resp.json()
    
    let retObj = Object.assign({id: obj._id}, obj._source)
    return retObj
        
}

export async function getUserByUsername(username) {
    return getUserBy("username", username)
}

async function getUserBy(propName, value) {
    const user = USERS.find(u => u[propName] == value)
    return user
}


