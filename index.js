const api = {
  endpoint: "https://api.openweathermap.org/data/2.5/",
  key: "7ffdb7b33e5910d2b51afbc661704e9f"
}

const input = document.querySelector("#input");
input.addEventListener("keypress", enter);

//если нажимаем клавишу 13/enter, то тогда осуществляется поиск (вызываем функцию getInfo,в кот пропишем все данные как искать инфо на нашей api про погоду)

function enter(e) {
  if (e.keyCode === 13){
    getInfo(input.value); //получаем доступ к тому, что напишет пользователь
  }
}

async function getInfo(data) {
  const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`);
  const result = await res.json();
  displayResult(result); // c параметром result получаем доступ ко всей инфо и вызываем функцию здесь, чтобы эту инфо отразить и не потерять
}

function displayResult(result) {
  //показываем город и страну
  let city = document.querySelector("#city"); //получаем доступ к полю с названием города
  city.textContent = `${result.name}, ${result.sys.country}`;

  //дата
  getOurDate();

  //температура
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(result.main.temp)}<span>°</span>`;
  
  //температура по ощущениям
  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = `${Math.round(result.main.feels_like)}<span>°</span>`;

  //погода
  let conditions = document.querySelector("#conditions");
  conditions.textContent = `${result.weather[0].main}`;

  //мин и макс температура
  let variation = document.querySelector("#variation");
  variation.innerHTML = "Min: " + `${Math.round(result.main.temp_min)}<span>°</span>` + " " + "Max: " + `${Math.round(result.main.temp_max)}<span>°</span>`
}

function getOurDate() {
  //1. дата сегодня
  const myDate = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  //2. день недели
  let day = days[myDate.getDay()];

  //3. число
  let todayDate = myDate.getDate();

  //4. месяц
  let month = months[myDate.getMonth()];

  //5. год
  let year = myDate.getFullYear();

  //показываем результат
  let showDate = document.querySelector("#date");
  showDate.textContent = `${day}` + " " + `${todayDate}` + " " +  `${month}` + " " + `${year}`

}