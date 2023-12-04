
import swaggerUi from 'swagger-ui-express'
import yaml from 'yamljs'

import cors from 'cors'
import express from 'express'


import * as staticWebSite from './web/site/static-web-site.mjs'
import tasksSiteInit from './web/site/tasks-web-site.mjs'
import tasksApiInit from './web/api/tasks-web-api.mjs'
import taskServicesInit from './services/tasks-services.mjs'
import userServicesInit from './services/users-services.mjs'
import usersApiInit from './services/users-services.mjs'
import tasksDataInit from './data/tasks-data.mjs'
//import tasksDataInit from './data/tasks-data-db.mjs'
//import usersDataInit from './data/users-data.mjs'

const tasksData = tasksDataInit()
//const usersData = usersDataInit()
//const usersServices = userServicesInit(usersData)
const usersServices = userServicesInit()
const tasksServices = taskServicesInit(usersServices, tasksData)
const tasksApi = tasksApiInit(tasksServices)
const usersApi = usersApiInit(usersServices)

const tasksSite = tasksSiteInit(tasksServices)

const PORT = 1904
const swaggerDocument = yaml.load('./docs/tasks-api.yaml')

console.log("Setting up server")
let app = express()

// Contained resources
// - Tasks: /tasks
// - Task:  /tasks/:id


app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json())
app.use('/site', express.static('./web/site/public'))


// Get All Tasks: GET /tasks

// Web site routes

app.get('/site/home', staticWebSite.getHome)
app.get('/site/slb', staticWebSite.getImage)
app.get('/site/tasks/:id', tasksSite.getTask)

// Web API routes
app.get('/tasks', tasksApi.getAllTasks)

// Get one Task: GET /tasks/:id
app.get('/tasks/:id', tasksApi.getTask)

// Insert Task: POST /tasks
app.post('/tasks', tasksApi.insertTask)

// Update Task: PUT /tasks/:id
app.put('/tasks/:id', tasksApi.updateTask)

// Delete Task: DELETE /tasks/:id
app.delete('/tasks/:id', tasksApi.deleteTask)


// Create User: POST /users
app.post('/users', usersApi.insertUser)


app.listen(PORT, () => console.log(`Server listening in http://localhost:${PORT}`))

console.log("End setting up server")
