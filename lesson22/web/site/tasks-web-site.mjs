//import tasksServicesInit  from '../../services/tasks-services.mjs'
//import * as tasksData from '../data/tasks-data.mjs'
import errorToHttp from '../errors-to-http-responses.mjs'

    
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
        rsp.render('tasks', {tasks})
        
        // return taskServices.getAllTasks(req.token)
        //     .then(tasks => rsp.json(tasks))
        
    }

    async function _getTask(req, rsp) {
        const id = req.params.id
        const task = await taskServices.getTask(id, req.token)
        var htmlTask = `
        <!DOCTYPE html>
            <html>
                <head>
                    <title>Task 1 details</title>
                </head>
                <body>
                    <h1>Task Details</h1>
                    <p>Task name: ${task.title}</p>
                    <p>Task description: ${task.description}</p>
                </body>
            </html>`
        rsp.type('html')
        rsp.send(htmlTask)
        
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
        // TODO: Handle toke properly 
        return req.token = "14d72b99-48f6-48d3-94d3-5a4dcfd96c80"
    }
}



