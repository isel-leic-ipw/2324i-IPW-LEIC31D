
import * as usersServices from './users-services.mjs'

const NUM_TASKS = 6

const TASKS = new Array(NUM_TASKS)
                .fill(0).map((v, idx) => { 
                    return { 
                        id: (idx+1), 
                        name: `Task ${idx+1}`, 
                        description: `Task ${idx+1} description`,
                        userId: (idx % 2) + 1
                     }
                })

let nextId = TASKS.length+1

export function getAllTasks(userToken) {
    const userId = usersServices.getUserId(userToken)
    console.log(userId)
    return TASKS.filter(t => t.userId == userId)   
}

export function getTask(req, rsp) {
    const id = req.params.id 
    const task = TASKS.find(t => t.id == id)
    if(task)
        return rsp.json(task)
    rsp.status(404).json("Task not found")
}

export function insertTask(req, rsp) {
    const task = {
        id: nextId++,
        name: req.body.n,
        description: req.body.d
    }

    TASKS.push(task)
    rsp.status(201).json(task)
}

export function updateTask(req, rsp) {
    rsp.end(`PUT task with id ${req.params.id}`)
}

export function deleteTask(req, rsp) {
    const id = req.params.id
    const taskIdx = TASKS.findIndex(t => t.id == id)
    if(taskIdx != -1) {
        TASKS.splice(taskIdx,1)
        return rsp.json(`Task with id ${id} deleted`)
    }
    rsp.status(404).json(`Task with id ${id} not found`)
}


// Auxiliary module function
function getToken(req) {
    const token = req.get("Authorization")
    if(token) {
        return token.split(" ")[1]
    }
}
