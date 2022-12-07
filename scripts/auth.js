import { generateString } from "./utils.js"




let users = []
const domain = window.location.hostname



const login_form = document.getElementById("login_form")
const signup_form = document.getElementById("signup_form")




const GoToRegisterPage = () => {
    if(login_form && signup_form) {
        login_form.classList.add("hide")
        signup_form.classList.remove("hide")
    }
}
const GoToLoginPage = () => {
    if(login_form && signup_form) {
        signup_form.classList.add("hide")
        login_form.classList.remove("hide")
    }
}





const Register = () => {
    let username = document.querySelector("#signup_form input[name='username']").value
    let password = document.querySelector("#signup_form input[name='password']").value
    let confirm_password = document.querySelector("#signup_form input[name='confirm_password']").value

    if(!username || !password || !confirm_password || username == "" || password === "" || confirm_password === "") {
        alert("Please enter required field");
        return
    }
    if(password != confirm_password) {
        alert("Wrong confirmation password")
        return
    }

    if(IsUserAlreadyExist(username)) {
        alert("User already exist")
        return
    }

    const new_user = {
        id: generateString(10),
        username: username,
        password: password
    }
    AddUser(new_user)
    Authenticate(new_user)
}

const Authenticate = (user) => {
    localStorage.setItem("auth-user-newspoc", user.id)
}


const AddUser = (user) => {
    users.push(user)
    localStorage.setItem("users-newspoc", JSON.stringify(users))
}

const IsUserAlreadyExist = (username) => {
    const found_user = users.find(user => user.username == username)
    if(found_user) return true
    return false
}

const GetUsers = () => {
    const users_newspoc = localStorage.getItem("users-newspoc")
    if(users_newspoc) {
        users = JSON.parse(users_newspoc)
    }
    return users_newspoc;
}


const CheckAuth = () => {
    const auth_user_id = localStorage.getItem("auth-user-newspoc")
    return auth_user_id
}




export {AddUser, GetUsers, Register, GoToRegisterPage, GoToLoginPage, CheckAuth}