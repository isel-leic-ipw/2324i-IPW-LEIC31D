import crypto from 'node:crypto'
import errors from '../common/errors.mjs'

// TODO: This module need a lot of work!!!

const USERS = [
    {
        id: 1,
        name: "jj",
        token: "14d72b99-48f6-48d3-94d3-5a4dcfd96c80"
    },
    {
        id: 2,
        name: "roger",
        token: "14d72b99-48f6-48d3-94d3-5a4dcfd96c81"
    }
]

let nextId = USERS.length+1

export default function () {

    return {
        insertUser,
        getUserId
    }

    async function insertUser(username) {
        if(!USERS.find(u => u.name == username)) {
            const user = {
                id: nextIdp++,
                name: username,
                token: crypto.randomUUID()
            }

            USERS.push(user)
            return true
        } 

        return false
    }


    async function getUserId(userToken) {
        console.log(userToken)
        const user = USERS.find(u => {
            console.log(u.token)
            return u.token == userToken
        })
        console.log("user:" , user)
        if(user) {
            return user.id
        }
        
        throw errors.USER_NOT_FOUND()
    }
}