import { AddUser, CheckAuth, GetUsers } from "./auth.js"
import { GetNews } from "./news.js"
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
    Clock()

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

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Clock = () => {
    const hour_el = document.getElementById("hour")
    const minute_el = document.getElementById("minute")
    const second_el = document.getElementById("second")

    const day_el = document.getElementById("day")
    const month_el = document.getElementById("month")
    const year_el = document.getElementById("year")

    if(!hour_el || !minute_el || !second_el || !day_el || !month_el || !year_el) {
        return 
    }


    const d = new Date()

    hour_el.innerText = d.getHours().toString().length == 1 ? "0"+d.getHours() : d.getHours()
    minute_el.innerText = d.getMinutes().toString().length == 1 ? "0"+d.getMinutes() : d.getMinutes()
    second_el.innerText = d.getSeconds().toString().length == 1 ? "0"+d.getSeconds() : d.getSeconds()

    day_el.innerText = d.getDate().toString().length == 1 ? "0"+d.getDate() : d.getDate()
    month_el.innerText = monthNames[d.getMonth()]
    year_el.innerText = d.getFullYear()
}


setInterval(Update,1000)

Update()
GetNews()

export {InitUsers}
