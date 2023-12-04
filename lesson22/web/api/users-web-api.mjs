   
import * as usersServices from '../../services/users-services.mjs'




export function insertUser(req, rsp) {
    const username = req.body.username

    if(usersServices.insertUser(username)) {
        return rsp.status(201).json({"user-token": user.token})
    } 

    rsp.status(400).json("User already exists")
}

