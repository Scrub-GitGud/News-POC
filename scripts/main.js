import { AddUser, CheckAuth, GetUsers } from "./auth.js"
import { generateString } from "./utils.js"



const curr_page = window.location.pathname
const domain = window.location.hostname




const InitUsers = () => {
    console.log("Initializing User...")
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
            window.location.href = "/auth.html"
        }
    } else {
        if(curr_page == "/auth.html") {
            console.log("Go to home page")
            window.location.href = "/"
        }
    }
}


setInterval(Update,1500)



export {InitUsers}