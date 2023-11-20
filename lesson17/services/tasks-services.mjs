
import * as usersServices from './users-services.mjs'
import * as tasksData from '../data/tasks-data.mjs'
import errors from '../common/errors.mjs'

export async function getAllTasks(userToken) {
    const userId = await usersServices.getUserId(userToken)
    return tasksData.getTasks(userId)
}

export async function getTask(taskId, userToken) {
    const userId = await usersServices.getUserId(userToken)
    return await _getTask(taskId, userId)
}

export async function insertTask(newTask, userToken) {
    const userId = await usersServices.getUserId(userToken)
    const task = {
        title: newTask.title,
        description: newTask.description,
        userId: userId
    }
    return await tasksData.insertTask(task)
}

export async function updateTask(taskId, newTask, userToken) {
    const userId = await usersServices.getUserId(userToken)
    const task = await _getTask(taskId, userId)
    task.title = newTask.title
    task.description = newTask.description
    await tasksData.updateTask(task)
}

export async function deleteTask(taskId, userToken) {
    const userId = await usersServices.getUserId(userToken)
    // Get the task to check if the user userId is its owner
    const task = await _getTask(taskId, userId) 
    await tasksData.deleteTask(taskId)
}


async function _getTask(taskId, userId) {
    if(isNaN(Number(taskId))) {
        throw errors.INVALID_ARGUMENT("taskId")
    }
    const task = await tasksData.getTask(taskId)
    if(task.userId == userId)
        return task
    throw errors.NOT_AUTHORIZED(`User ${userId}`, `Task with id ${taskId}`)
}

