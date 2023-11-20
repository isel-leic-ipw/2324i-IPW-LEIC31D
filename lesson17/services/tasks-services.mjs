
import * as usersServices from './users-services.mjs'
import * as tasksData from '../data/tasks-data.mjs'

export async function getAllTasks(userToken) {
    const userId = usersServices.getUserId(userToken)
    return tasksData.getTasks(userId)
}

export async function getTask(taskId, userToken) {
    const userId = usersServices.getUserId(userToken)
    return _getTask(taskId, userId)
}

export async function insertTask(newTask, userToken) {
    const userId = usersServices.getUserId(userToken)
    const task = {
        title: newTask.title,
        description: newTask.description,
        userId: userId
    }
    return tasksData.insertTask(task)
}

export async function updateTask(taskId, newTask, userToken) {
    const userId = usersServices.getUserId(userToken)
    const task = _getTask(taskId, userId)
    task.title = newTask.title
    task.description = newTask.description
    tasksData.updateTask(task)
}

export async function deleteTask(taskId, userToken) {
    const userId = usersServices.getUserId(userToken)
    // Get the task to check if the user userId is its owner
    const task = _getTask(taskId, userId) 
    tasksData.deleteTask(taskId)
}


async function _getTask(taskId, userId) {
    const task = await tasksData.getTask(taskId)
    if(task.userId == userId)
        return task
    throw `Task with id ${taskId} does not belong to user ${userId}`
}

