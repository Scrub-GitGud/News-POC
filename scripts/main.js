import { AddUser, CheckAuth, GetUsers } from "./auth.js"
import { generateString } from "./utils.js"



const curr_page = window.location.pathname




const InitUsers = () => {
    const users_newspoc = GetUsers()
    if(!users_newspoc) {
        const new_user = {
            id: generateString(10),
            username: "Rifat Noor",
            password: "sadd"
        }
        AddUser(new_user)
    }
}



const Update = () => {
    console.log("Updating..")
    if(!CheckAuth()) {
        if(curr_page != "/auth.html") {
            console.log("Go to login page")
        }
    } else {
        if(curr_page == "/auth.html") {
            console.log("Go to home page")
        }
    }
}


// setInterval(Update,3000)

console.log(window.location.hostname)


export {InitUsers}