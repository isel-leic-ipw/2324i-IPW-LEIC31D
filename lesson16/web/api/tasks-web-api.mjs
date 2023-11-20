/// Module responsibilities: Handle all HTTP requests related to task management.
/// Handle API HTTP Requests consists of: 
///    - Get information the Request (URI, Headers and body)
///    - Call the services appropriate method 
///    - With the services result, generate the HTTP response

import * as taskServices from '../../services/tasks-services.mjs'


function processRequest(internalFunction) {
    return function(req, rsp) {
        const token = getToken(req)
        if(!token) {
            return rsp.status(401).json("Not authorized")
        }
        internalFunction(req, rsp)
    }
}

export const getAllTasks = processRequest(_getAllTasks)
export const getTask = processRequest(_getTask)
    


function _getAllTasks(req, rsp) {
    
    const tasks = taskServices.getAllTasks(token)
    return rsp.json(tasks)
    
}

function _getTask(req, rsp) {
    const token = getToken(req)
    if(!token) {
        return rsp.status(401).json("Not authorized")
    }


    const taskId = req.params.id
    const task = taskServices.getTask(taskId, token)
    if(task) 
        return rsp.json(tasks)

    rsp.status(404).json("Task not found")
}

export function insertTask(req, rsp) {
    const token = getToken(req)
    if(!token) {
        return rsp.status(401).json("Not authorized")
    }

    const newTask = {
        title: req.body.title,
        description: req.body.description
    }

    const task = taskServices.insertTask(newTask, token)
    
    rsp.status(201).json({
        status: `Task with id ${task.id} created`,
        task: task
    })
}

export function updateTask(req, rsp) {
    const token = getToken(req)
    if(!token) {
        return rsp.status(401).json("Not authorized")
    }

    
    const task = taskServices.updateTask(
        req.params.id, 
        {
            title: req.body.title,
            description: req.body.description
        }, 
    token)
    
    rsp.status(201).json({
        status: `Task with id ${task.id} created`,
        task: task
    })
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
