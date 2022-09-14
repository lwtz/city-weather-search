const api_key = 'ba605efc18f1572f61892fe426f18a1a'
const apiCountry = `https://countryflagsapi.com/png/`
const apiFLag = `http://openweathermap.org/img/wn/`

const cityInput = document.querySelector('#city-input')
const buttonSearch = document.querySelector('#search')

const cityElement = document.querySelector('#city')
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const humidityElement = document.querySelector('#humidity span')
const windElement = document.querySelector('#wind span')

const weatherContainer = document.querySelector('#weather-data')
const errorMessageContainer = document.querySelector('#error-message')
const loader = document.querySelector('#loader')

const weatherDataContainer = document.querySelector('#weather-data')

// Funções
const toggleLoader = () => {
  loader.classList.toggle('hide')
}

const getWeatherData = async (city) => {
  toggleLoader()

  const api_call = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}&lang=pt_br`,
  )
  const data = await api_call.json()

  toggleLoader()
  return data
}

// Tratamento de erro
const showErrorMessage = () => {
  errorMessageContainer.classList.remove('hidden')
}

const hiddenInformation = () => {
  errorMessageContainer.classList.add('hidden')
  weatherContainer.classList.add('hidden')
}

const showWeatherData = async (data) => {
  hiddenInformation()

  const citiesData = await getWeatherData(data)

  if (citiesData.cod === '404') {
    showErrorMessage()
    return
  }

  cityElement.innerHTML = citiesData.name
  tempElement.innerHTML = parseInt(citiesData.main.temp) + '°C'
  descElement.innerHTML = citiesData.weather[0].description
  weatherIconElement.setAttribute('src', apiFLag + citiesData.weather[0].icon + '.png')
  countryElement.setAttribute('src', apiCountry + citiesData.sys.country)
  humidityElement.innerText = `${citiesData.main.humidity}%`
  windElement.innerText = `${citiesData.wind.speed} m/s`

  weatherDataContainer.classList.remove('hidden')
}

// Events
buttonSearch.addEventListener('click', (e) => {
  e.preventDefault()

  const city = cityInput.value
  showWeatherData(city)
})

cityInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    const city = e.target.value

    showWeatherData(city)
  }
})
