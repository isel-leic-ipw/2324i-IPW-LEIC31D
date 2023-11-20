import * as taskServices from '../../services/tasks-services.mjs'

import errorToHttp from './errors-to-http-responses.mjs'

export const getAllTasks = processRequest(_getAllTasks)
export const getTask = processRequest(_getTask)
export const insertTask = processRequest(_insertTask)
export const updateTask = processRequest(_updateTask)
export const deleteTask = processRequest(_deleteTask)

function processRequest(reqProcessor) {
    return async function(req, rsp) {
        const token =  getToken(req)
        if(!token) {
            rsp.status(401).json("Not authorized")  
        }
        req.token = token
        try {
            return await reqProcessor(req, rsp)
        } catch (e) {
            const rspError = errorToHttp(e)
            rsp.status(rspError.status).json(rspError.body)
        }
    }
}

async function  _getAllTasks(req, rsp) {
    const tasks = await taskServices.getAllTasks(req.token)
    return rsp.json(tasks)
    
    // return taskServices.getAllTasks(req.token)
    //     .then(tasks => rsp.json(tasks))
    
}

async function _getTask(req, rsp) {
    const id = req.params.id
    const task = await taskServices.getTask(id, req.token)
    if(task)
        return rsp.json(task)
    rsp.status(404).json("Task not found")
}

async function _insertTask(req, rsp) {
    const newTask = {
        name: req.body.title,
        description: req.body.description
    }
    const task = await taskServices.insertTask(newTask, req.token)
    rsp.status(201).json(task)
}

async function _updateTask(req, rsp) {
    const newTask = {
        name: req.body.title,
        description: req.body.description
    }
    const task = await taskServices.updateTask(req.params.id, newTask, req.token)
    rsp.json(task)
}

async  function _deleteTask(req, rsp) {
    const id = req.params.id
    const task = taskServices.deleteTask(id, req.token)
    if(task) {}
    rsp.status(404).json(`Task with id ${id} not found`)
}


// Auxiliary module function
function getToken(req) {
    const token = req.get("Authorization")
    if(token) {
        return token.split(" ")[1]
    }
}
