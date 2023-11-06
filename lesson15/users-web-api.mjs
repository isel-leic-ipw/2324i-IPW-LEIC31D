import crypto from 'node:crypto'

// const NUM_TASKS = 10

const USERS = [
    {
        id: 1,
        name: "jj",
        token: "b351d48c-1fc0-4cbf-a184-52c9138b0305"
    },
    {
        id: 2,
        name: "schmidt",
        token: "b351d48c-1fc0-4cbf-a184-52c9138b0306"
    }
]

let nextId = USERS.length+1


export function createUser(req, rsp) {
    const username = req.body.username
    const existingUser = USERS.find(u => u.name == username)
    if(!existingUser) {
        const user = {
            id: nextId++,
            name: username,
            token: crypto.randomUUID()
        }

        USERS.push(user)
        return rsp.status(201).json(user)
    }
    rsp.status(400).json("User already exists!")
}

