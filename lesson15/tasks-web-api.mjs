
const NUM_TASKS = 10

const TASKS = new Array(NUM_TASKS)
                .fill(0).map((v, idx) => { 
                    return { 
                        id: (idx+1), 
                        name: `Task ${idx+1}`, 
                        description: `Task ${idx+1} description`,
                        owner: (idx % 2) + 1
                    }
                })

let nextId = TASKS.length+1

export function getAllTasks(req, rsp) {
    let token = getToken(req)
    if(token) {
        return rsp.json(TASKS)
    }

    rsp.status(401).json("Invalid user token")

    
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


// Auxiliary functions 

function getToken(req) {
    let token = req.get("Authorization")
    if(token) {
        return token.split(" ")[1]
    }
}
