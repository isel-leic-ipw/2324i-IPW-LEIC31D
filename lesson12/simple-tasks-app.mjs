

import express from 'express'

const PORT = 1904

console.log("Setting up server")
let app = express()

// Contained resources
// - Tasks: /tasks
// - Task:  /tasks/:id


// Get All Tasks: GET /tasks
app.get('/tasks', getAllTasks)

// Get one Task: GET /tasks/:id
app.get('/tasks/:id', getTask)

// Insert Task: POST /tasks
app.post('/tasks', insertTask)

// Update Task: PUT /tasks/:id
app.put('/tasks/:id', updateTask)

// Delete Task: DELETE /tasks/:id
app.delete('/tasks/:id', deleteTask)

app.listen(PORT, () => console.log(`Server listening in http://localhost:${PORT}`))

console.log("End setting up server")







function getAllTasks(req, rsp) {
    rsp.end(`GET all tasks`)
}

function getTask(req, rsp) {
    const id = req.params.id 
    rsp.end(`GET a task with id ${id}`)
}

function insertTask(req, rsp) {
    rsp.end("POST task")
}

function updateTask(req, rsp) {
    rsp.end(`PUT task with id ${req.params.id}`)
}

function deleteTask(req, rsp) {
    rsp.end(`DELETE task with id ${req.params.id}`)
}
