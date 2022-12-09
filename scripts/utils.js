const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const formatDate = (_date) => {
    let date = new Date(_date)
    return `${date.getDate()} ${monthShortNames[date.getMonth()]}, ${date.getFullYear()}`
}

const CalcUnixDate = (unix) => {
    const date = new Date(unix * 1000)
    const now = new Date()
    
    let diff = parseInt((now.getTime() - date.getTime()/1000))
    return msToTime(diff)
}


// ! Copied From: https://stackoverflow.com/questions/19700283/how-to-convert-time-in-milliseconds-to-hours-min-sec-format-in-javascript
function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    // return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    return hours + "." + minutes;
}


export {monthNames, monthShortNames, CalcUnixDate, formatDate}