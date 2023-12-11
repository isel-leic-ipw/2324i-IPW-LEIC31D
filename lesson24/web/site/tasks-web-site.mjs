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
        updateTaskForm: processRequest(_updateTaskForm),
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
        tasks.forEach((t, idx) => t.strong = (idx%2 == 0))
        rsp.render('tasks', {title: 'All tasks', tasks: tasks})
    }

    async function _getTask(req, rsp) {
        const id = req.params.id
        const task = await taskServices.getTask(id, req.token)
        rsp.render('task', {title: `Task ${id} details`, task: task})
    }

    async function _insertTask(req, rsp) {
        const newTask = {
            title: req.body.title,
            description: req.body.description
        }
        const task = await taskServices.insertTask(newTask, req.token)
        rsp.redirect('/site/tasks')
        //rsp.render('task-created')
    }

    async function _updateTask(req, rsp) {
        const newTask = {
            title: req.body.title,
            description: req.body.description
        }
        const task = await taskServices.updateTask(req.params.id, newTask, req.token)
        rsp.redirect("/site/tasks")
    }


    async function _updateTaskForm(req, rsp) {
        const id = req.params.id
        const task = await taskServices.getTask(id, req.token)

        rsp.render('task-update', {title: `Task ${id} update`, task: task})
    }
    

    async  function _deleteTask(req, rsp) {
        const id = req.params.id
        const task = taskServices.deleteTask(id, req.token)
        rsp.redirect("/site/tasks")
    }


    // Auxiliary module function
    function getToken(req) {
        // TODO: HAMMER TIME!!!! Handle toke properly 
        return req.token = "14d72b99-48f6-48d3-94d3-5a4dcfd96c80"
    }
}



