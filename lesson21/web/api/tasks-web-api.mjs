//import tasksServicesInit  from '../../services/tasks-services.mjs'
//import * as tasksData from '../data/tasks-data.mjs'
import errorToHttp from './errors-to-http-responses.mjs'

    
export default function(taskServices) {
    if(!taskServices)
        throw errors.INVALID_ARGUMENT("taskServices")

    return {
        getAllTasks: processRequest(_getAllTasks),
        getTask: processRequest(_getTask),
        insertTask: processRequest(_insertTask),
        updateTask: processRequest(_updateTask),
        deleteTask: processRequest(_deleteTask)
    }

    function processRequest(reqProcessor) {
        return async function(req, rsp) {
            const token =  getToken(req)
            if(!token) {
                rsp
                    .status(401)
                    .json({error: `Invalid authentication token`})
            }
            try {
                return await reqProcessor(req, rsp)
            } catch (e) {
                const rspError = errorToHttp(e)
                rsp.status(rspError.status).json(rspError.body)
                console.log(e)
            }
        }
    }

    async function  _getAllTasks(req, rsp) {
        const tasks = await taskServices.getAllTasks(req.token)
        rsp.json(tasks)
        
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
            title: req.body.title,
            description: req.body.description
        }
        const task = await taskServices.insertTask(newTask, req.token)
        rsp.status(201).json(task)
    }

    async function _updateTask(req, rsp) {
        const newTask = {
            title: req.body.title,
            description: req.body.description
        }
        const task = await taskServices.updateTask(req.params.id, newTask, req.token)
        rsp.json(task)
    }

    async  function _deleteTask(req, rsp) {
        const id = req.params.id
        const task = taskServices.deleteTask(id, req.token)
        rsp.json(`Task with id ${id} deleted`)
    }


    // Auxiliary module function
    function getToken(req) {
        const BEARER_STR = "Bearer "
        const tokenHeader = req.get("Authorization")
        if(!(tokenHeader && tokenHeader.startsWith(BEARER_STR) && tokenHeader.length > BEARER_STR.length)) {
            return null
        }
        req.token = tokenHeader.split(" ")[1]
        return req.token
    }
}



