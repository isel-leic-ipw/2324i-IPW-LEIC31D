import * as taskServices from './tasks-services.mjs'

export function getAllTasks(req, rsp) {

    const s = req.query.s || 10
    // rsp.set("Content.-Type", "application/json")
    // rsp.end(JSON.stringify(TASKS, undefined, 2))
    const token = getToken(req)
    if(token) {
        const tasks = taskServices.getAllTasks(token)
        return rsp.json(tasks)
    }
    rsp.status(401).json("Not authorized")
    
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
