    // Module manages application users data.
// In this specific module, data is stored ElasticSearch

import {get, post, del, put} from './fetch-wrapper.mjs'
import uriManager from './uri-manager.mjs'


export default async function (indexName = 'users') {

    const URI_MANAGER = uriManager(indexName)

    // Create the index unconditionally. If the index already exists, nothing happiness
    

    return {
        getUserByToken,
        getUserByUsername
    }



    async function getUserByToken(token) {
        return getUserBy("token",  token)
    }

    async function getUserByUsername(username) {
        return getUserBy("username", username)
    }

    async function getUserBy(propName, value) {
        const uri = `${URI_MANAGER.getAll()}?q=${propName}:${value}`
        return get(uri)
            .then(body => body.hits.hits.map(createTaskFromElastic))
    }

    function createUserFrom(taskElastic) {
        let user = Object.assign({id: taskElastic._id}, taskElastic._source)
        return user
    }

}
