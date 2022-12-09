"https://api.openweathermap.org/data/2.5/weather?q=copenhagen&appid=c43c1935e52726023290ce3fcd854fb9&units=metric"

import { CalcUnixDate } from "./utils.js"


const api_key = "c43c1935e52726023290ce3fcd854fb9"

const units = "metric"
const city = "copenhagen"


const GetWeather = () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=${units}`

    SendWeatherApiReq(url)
}


const SendWeatherApiReq = (url) => {
    var req = new Request(url);
    fetch(req)
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(responseJSON);

            if(!responseJSON.main) {
                console.log("Api failed")
                return
            }
            
            renderWeather(responseJSON);
        })
}


const renderWeather = (data) => {
    const temperature_el = document.querySelector("#temperature")
    const sunrise_el = document.querySelector("#sunrise")
    const sunset_el = document.querySelector("#sunset")
    const temperature_icon = document.querySelector("#temperature_icon")

    if(!temperature_el) {
        console.log("")
        return
    }

    let sunrise = CalcUnixDate(data.sys.sunrise)
    let sunset = CalcUnixDate(data.sys.sunset)

    temperature_el.innerText = data.main?.temp >= 1 ? parseInt(data.main?.temp) : data.main?.temp
    sunrise_el.innerText = `${sunrise} Hrs`
    sunset_el.innerText = `${sunset} Hrs`
    temperature_icon.src = `http://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`
}


export {GetWeather}