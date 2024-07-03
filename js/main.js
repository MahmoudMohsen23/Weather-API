// SEARCH INPUT 

let searchInput = document.getElementById("search")

// TODAY VARIABLES

let todayName = document.getElementById("today_date_day_name")
let todayNumber = document.getElementById("today_date_day_number")
let todayMonth = document.getElementById("today_date_month")
let todayLocation = document.getElementById("today_location")
let todayTemp = document.getElementById("today_temp")
let todayConditionImg = document.getElementById("today_condition_image")
let todayConditionTxt = document.getElementById("today_condition_text")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("wind_direction")


// NEXT DATA

let nextDay = document.getElementsByClassName("next_day_name")
let nextMaxTemp = document.getElementsByClassName("next_max_temp")
let nextMinTemp = document.getElementsByClassName("next_min_temp")
let nextConditionImg = document.getElementsByClassName("next_day_img")
let nextConditionTxt = document.getElementsByClassName("next_condition_text")

// FETCH API DATA

async function getWeatherData(name) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6f81771240ae4caa8c522947240307&q=${name}&days=3`)
    let data = await response.json()
    return data
}

// DISPLAY TODAY DATA

function displayTodayData(data) {
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-US", { weekday: "long" })
    todayNumber.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US", { month: "long" })
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayConditionImg.setAttribute("src", data.current.condition.icon)
    todayConditionTxt.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity + "%"
    wind.innerHTML = data.current.wind_kph + "km/h"
    windDirection.innerHTML = data.current.wind_dir
}

// DISPLAY NEXT DAYS

function displayNextData(data) {
    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(data.forecast.forecastday[i + 1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US", { weekday: "long" })
        nextMaxTemp[i].innerHTML = data.forecast.forecastday[i + 1].day.maxtemp_c
        nextMinTemp[i].innerHTML = data.forecast.forecastday[i + 1].day.mintemp_c
        nextConditionImg[i].setAttribute("src", data.forecast.forecastday[i + 1].day.condition.icon)
        nextConditionTxt[i].innerHTML = data.forecast.forecastday[i + 1].day.condition.text
    }
}

// START APP

async function startApp(city = "cairo") {
    let weatherData = await getWeatherData(city)
    displayTodayData(weatherData)
    displayNextData(weatherData)
}

startApp()

searchInput.addEventListener("input", function () {
    startApp(searchInput.value)
})