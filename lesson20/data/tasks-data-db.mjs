
import errors from '../common/errors.mjs'


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
        
    }

    async function getTask(taskId) {
        
        }

    async function insertTask(newTask) {
        
    }

    async function updateTask(newTask) {
        
    }

    async function deleteTask(taskId) {
        
    }


    function getTaskIdx(taskId) {
        
    }

}