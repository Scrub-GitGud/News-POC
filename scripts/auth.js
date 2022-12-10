import { generateString } from "./utils.js"




let users = []
let profiles = []
let categories = []

const all_categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"]

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



const Login = () => {
    let username = document.querySelector("#login_form input[name='username']").value
    let password = document.querySelector("#login_form input[name='password']").value

    if(!username || !password || username == "" || password === "") {
        alert("Please enter required field");
        return
    }

    const found_user = users.find(user => user.username == username)
    if(!found_user) {
        alert("User doesn't exist.")
        return
    }

    if(found_user.password != password) {
        alert("Wrong Password. Please try again.")
        return
    }
    
    Authenticate(found_user)
}

const Logout = () => {
    localStorage.removeItem("auth-user-newspoc")
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
    AddProfile(new_user)
    Authenticate(new_user)
}


const Authenticate = (user) => {
    localStorage.setItem("auth-user-newspoc", user.id)
}


const AddUser = (user) => {
    users.push(user)
    localStorage.setItem("users-newspoc", JSON.stringify(users))
}
const AddProfile = (user) => {
    let new_profile = {
        user_id: user.id,
        f_name: "",
        l_name: "",
        email: ""
    }
    
    profiles.push(new_profile)

    localStorage.setItem("profiles-newspoc", JSON.stringify(profiles))
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
const GetProfiles = () => {
    const profiles_newspoc = localStorage.getItem("profiles-newspoc")
    if(profiles_newspoc) {
        profiles = JSON.parse(profiles_newspoc)
    } else {
        profiles = []
    }
    return profiles_newspoc;
}


const CheckAuth = () => {
    const auth_user_id = localStorage.getItem("auth-user-newspoc")
    return auth_user_id
}


const GetMyProfile = () => {
    const auth_user_id = localStorage.getItem("auth-user-newspoc")
    if(!auth_user_id) {
        console.log("Auth User ID not found!")
        return
    }

    const auth_user = users.find((user) => user.id == auth_user_id) 
    if(!auth_user) {
        console.log("Auth User Not Found")
        return
    }

    const profile = profiles.find((profile) => profile.user_id == auth_user_id)

    console.log("Auth User: ", auth_user)
    console.log("Auth Profile: ", profile)

    if(!profile) {
        console.log("Profile not found")
        return
    }


    let username_el = document.querySelector("#profile_form input[name='username']")
    let f_name_el = document.querySelector("#profile_form input[name='f_name']")
    let l_name_el = document.querySelector("#profile_form input[name='l_name']")
    let email_el = document.querySelector("#profile_form input[name='email']")
    let country_el = document.querySelector("#profile_form input[name='country']")
 
    if(!username_el || !f_name_el || !l_name_el || !email_el) {
        console.log("Some error or something...")
        return
    }

    username_el.value = auth_user.username ?? ""
    f_name_el.value = profile.f_name ?? ""
    l_name_el.value = profile.l_name ?? ""
    email_el.value = profile.email ?? ""
    country_el.value = profile.country ?? ""
    categories = profile.categories ?? []
    RenderMyCategories(profile.categories ?? [])
}
const RenderMyCategories = (categories) => {
    categories.forEach(category => {
        const category_checkbox = document.querySelector(`#${category}`)
        if(category_checkbox) {
            category_checkbox.checked = true
        }
    });
}

const SaveMyProfile = () => {
    const auth_user_id = localStorage.getItem("auth-user-newspoc")
    if(!auth_user_id) {
        console.log("Auth User ID not found!")
        return
    }
    
    
    let username_el = document.querySelector("#profile_form input[name='username']")
    let f_name_el = document.querySelector("#profile_form input[name='f_name']")
    let l_name_el = document.querySelector("#profile_form input[name='l_name']")
    let email_el = document.querySelector("#profile_form input[name='email']")
    let country_el = document.querySelector("#profile_form input[name='country']")
 
    if(!username_el || !f_name_el || !l_name_el || !email_el || !country_el) {
        console.log("Some error or something...")
        return
    }

    
    let updated_profile = {
        user_id: auth_user_id,
        f_name: f_name_el.value,
        l_name: l_name_el.value,
        email: email_el.value,
        country: country_el.value,
        categories: categories,
    }

    let updated_profiles = profiles.map((profile) => profile.user_id == auth_user_id ? updated_profile : profile)
    console.log(updated_profiles)

    localStorage.setItem("profiles-newspoc", JSON.stringify(updated_profiles))

    alert("Prfile Saved")
}

const DeleteMyProfile = () => {
    console.log("Deleting Profile...")

    const auth_user_id = localStorage.getItem("auth-user-newspoc")
    if(!auth_user_id) {
        console.log("Auth User ID not found!")
        return
    }

    let updated_profiles = profiles.filter((profile) => profile.user_id != auth_user_id)
    console.log(updated_profiles)
    localStorage.setItem("profiles-newspoc", JSON.stringify(updated_profiles))

    let updated_users = users.filter((user) => user.id != auth_user_id)
    console.log(updated_users)
    localStorage.setItem("users-newspoc", JSON.stringify(updated_users))

    Logout()
    
    alert("Prfile Deleted")
}

const UpdateMyCategories = (event) => {

    let value = event.target.value
    let isChecked = event.currentTarget.checked ?? false
    
    if(isChecked) {
        if(!categories.includes(value)) {
            categories.push(value)
        }
    } else {
        if(categories.includes(value)) {
            let index = categories.indexOf(value);
            if (index > -1) {
                categories.splice(index, 1);
            }
        }
    }
}


export {AddUser, GetUsers, Register, Login, Logout, GoToRegisterPage, GoToLoginPage, CheckAuth, GetProfiles, GetMyProfile, SaveMyProfile, DeleteMyProfile, UpdateMyCategories}