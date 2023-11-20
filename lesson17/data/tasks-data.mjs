
import errors from '../common/errors.mjs'

const NUM_TASKS = 6

const TASKS = new Array(NUM_TASKS)
                .fill(0).map((v, idx) => { 
                    return { 
                        id: (idx+1), 
                        name: `Task ${idx+1}`, 
                        description: `Task ${idx+1} description`,
                        userId: (idx % 2) + 1
                     }
                })
let nextId = TASKS.length+1


// export async function getTasks(userId, q, limit, skip = 0) {
//     const predicate = q ? t => t.title.includes(q) : t => true
//     const retTasks = tasks
//         .filter(t => t.userId == userId)
//         .filter(predicate)
//     const end = limit != Infinity ? (skip+limit) : retTasks.length
//     return retTasks.slice(skip,  end)
// }

export async function getTasks(userId) {
    return Promise.resolve(TASKS.filter(t => t.userId == userId))
}

export async function getTask(taskId) {
    const taskIdx = getTaskIdx(taskId)
    return TASKS[taskIdx]
}

export async function insertTask(newTask) {
    const task = {
        id: nextId++,
        title: newTask.title,
        description: newTask.description,
        userId: newTask.userId
    }
    TASKS.push(task)
    return task
}

export async function updateTask(newTask) {
    const task = getTask(taskId)
    task.title = newTask.title
    task.description = newTask.description
    return task
}

export async function deleteTask(taskId) {
    const taskIdx = getTaskIdx(taskId)
    const task = TASKS[taskIdx]
    TASKS.splice(taskIdx,1)
    return task
}


function getTaskIdx(taskId) {
    const taskIdx =  TASKS.findIndex(t => t.id == taskId) 
    if(taskIdx != -1) {
        return taskIdx
    }
    throw errors.NOT_FOUND("Task")
}

