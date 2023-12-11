
import errors from '../../common/errors.mjs'

const NUM_TASKS = 15

const TASKS = new Array(NUM_TASKS)
    .fill(0).map((v, idx) => {
        return {
            id: (idx + 1),
            title: `Task ${idx + 1}`,
            description: `Task ${idx + 1} description`,
            userId: (idx % 2) + 1
        }
    })

let nextId = TASKS.length + 1


export default function () {

    return {
        getTasks,
        getTask,
        insertTask,
        deleteTask,
        updateTask
    }
    // async function getTasks(userId, q, limit, skip = 0) {
    //     const predicate = q ? t => t.title.includes(q) : t => true
    //     const retTasks = tasks
    //         .filter(t => t.userId == userId)
    //         .filter(predicate)
    //     const end = limit != Infinity ? (skip+limit) : retTasks.length
    //     return retTasks.slice(skip,  end)
    // }

    async function getTasks(userId) {
        return Promise.resolve(TASKS.filter(t => t.userId == userId))
    }

    async function getTask(taskId) {
        const taskIdx = getTaskIdx(taskId)
        return TASKS[taskIdx]
    }

    async function insertTask(newTask) {
        const task = {
            id: nextId++,
            title: newTask.title,
            description: newTask.description,
            userId: newTask.userId
        }
        TASKS.push(task)
        return task
    }

    async function updateTask(taskToUpdate) {
        const task = await getTask(taskToUpdate.id)
        task.title = taskToUpdate.title
        task.description = taskToUpdate.description
        return task
    }

    async function deleteTask(taskId) {
        const taskIdx = getTaskIdx(taskId)
        TASKS.splice(taskIdx, 1)
        return taskId
    }


    function getTaskIdx(taskId) {
        const taskIdx = TASKS.findIndex(t => t.id == taskId)
        if (taskIdx != -1) {
            return taskIdx
        }
        throw errors.NOT_FOUND("Task")
    }

}