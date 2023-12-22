//curl -X PUT http://localhost:9200/tasks

// Create a task
//curl -X POST --data '{ "title" : "Task1" , "description" : "task 1 elastic", "userId": "iduser" }' -H "Content-Type: application/json" http://localhost:9200/tasks/_doc

import {get, post, del, put} from './fetch-wrapper.mjs'
import uriManager from './uri-manager.mjs'


export default async function (indexName = 'tasks') {
    const URI_MANAGER = await uriManager(indexName)

    return {
        getTasks: getTasksBody,
        getTask,
        updateTask,
        insertTask,
        deleteTask
    }

//    async function getTasks(userId, q, skip, limit) {
    async function getTasksBody(userId) {
        const query = {
            query: {
              match: {
                "userId": userId
              }
            }
          }
        return post(URI_MANAGER.getAll(), query)
            .then(body => body.hits.hits.map(createTaskFromElastic))
            //.then(filterTasks)

        // function filterTasks(tasks) {
        //     const predicate = q ? t => t.title.includes(q) : t => true
        //     const retTasks = tasks.filter(predicate)
            
        //     const end = limit != MAX_LIMIT ? (skip+limit) : retTasks.length
        //     return retTasks.slice(skip,  end)
        // }

    }

    async function getTasksQuery(userId) {
        const uri = `${URI_MANAGER.getAll()}?q=userId:${userId}`
        return get(uri)
            .then(body => body.hits.hits.map(createTaskFromElastic))
            //.then(filterTasks)

        // function filterTasks(tasks) {
        //     const predicate = q ? t => t.title.includes(q) : t => true
        //     const retTasks = tasks.filter(predicate)
            
        //     const end = limit != MAX_LIMIT ? (skip+limit) : retTasks.length
        //     return retTasks.slice(skip,  end)
        // }

    }

    async function getTask(taskId) {
        return get(URI_MANAGER.get(taskId)).then(createTaskFromElastic)
    }

    async function insertTask(newTask) {
        return post(URI_MANAGER.create(), newTask)
            .then(body => { newTask.id = body._id; return newTask })
    }

    async function updateTask(taskToUpdate) {
        return put(URI_MANAGER.update(taskToUpdate.id), taskToUpdate)
    }

    async function deleteTask(taskId) {
        return del(URI_MANAGER.delete(taskId))
            .then(body => body._id)
    }


    function createTaskFromElastic(taskElastic) {
        let task = Object.assign({id: taskElastic._id}, taskElastic._source)
        return task
    }
}