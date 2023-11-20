
import swaggerUi from 'swagger-ui-express'
import yaml from 'yamljs'

import cors from 'cors'
import express from 'express'
import * as tasksApi from './web/api/tasks-web-api.mjs'
import * as usersApi from './web/api/users-web-api.mjs'

const PORT = 1904
const swaggerDocument = yaml.load('./docs/tasks-api.yaml')

console.log("Setting up server")
let app = express()

// Contained resources
// - Tasks: /tasks
// - Task:  /tasks/:id


app.use('/slb', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(cors())
app.use(express.json())

// Get All Tasks: GET /tasks
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
