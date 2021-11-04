//////МОДУЛЬ HTML РАЗМЕТКИ//////
function createHTMLElements(x) {
   x.forEach((item) => {

      let { tag, classHTML } = item;
      let htmlElement = document.createElement(`${tag}`);
      htmlElement.classList = `${classHTML}`;

      if (isElenentWithСlass(htmlElement, 'b-wrapper-vidjet')
         || isElenentWithСlass(htmlElement, 'b-clock')) {
            document.body.append(htmlElement);
            htmlElement = '';
      }
      if (isElenentWithСlass(htmlElement, 'b-wrapper-vidjet__body-vidjet')
         || isElenentWithСlass(htmlElement, 'b-wrapper-vidjet__btns-panel')) {
            document.querySelector('.b-wrapper-vidjet').append(htmlElement);
            htmlElement = '';
      }
      if (isElenentWithСlass(htmlElement, 'b-clock__time')
         || isElenentWithСlass(htmlElement, 'b-clock__date')) {
            document.querySelector('.b-clock').append(htmlElement);
            htmlElement = '';
      }
      if (htmlElement) {
         document.querySelector('.b-wrapper-vidjet__body-vidjet').append(htmlElement);
      }
   });
};

function isElenentWithСlass(element, htmlClass) {
   return element.className === `${htmlClass}` ? true : false;
};






/////МОДУЛЬ ВИДЖЕТА//////
let htmlElements = [//To create page elements.
   { tag: 'article', classHTML: 'b-wrapper-vidjet' },
   { tag: 'section', classHTML: 'b-wrapper-vidjet__body-vidjet' },
   { tag: 'h2', classHTML: 'city' },
   { tag: 'p', classHTML: 'temperature' },
   { tag: 'p', classHTML: 'disclaimer' },
   { tag: 'p', classHTML: 'icon' },
   { tag: 'small', classHTML: 'pressure' },
   { tag: 'section', classHTML: 'b-wrapper-vidjet__btns-panel' },
   { tag: 'i', classHTML: ' fa-spinner fa-2x spinner' }
];


createHTMLElements(htmlElements);


function vidjetEngine(capital) {
   callAPI(capital);

   setTimeout(() => {
      switchSpinner();
      switchBodyVidjet();
   }, 300)

   switchSpinner();
   switchBodyVidjet();
}




//~~~~~Подмодуль "Панель кнопок"~~~~~//
let сities = [//To create module elements.
   { tag: 'button', htmlClass: 'btn', cityName: "Cairo", id: 360630 },
   { tag: 'button', htmlClass: 'btn', cityName: "Moscow", id: 524894 },
   { tag: 'button', htmlClass: 'btn', cityName: "Mexico", id: 3530597 },
   { tag: 'button', htmlClass: 'btn', cityName: "Sydney", id: 2147714 }
];


createButtons(сities, createButtonsPanel());


function createButtons(array, parent) {
   array.forEach((item) => {
      let { tag, htmlClass, id, cityName} = item;
      let htmlElement = document.createElement(`${tag}`);
      htmlElement.textContent = cityName;
      htmlElement.id = id;
      htmlElement.classList = htmlClass;
      parent.append(htmlElement);
   })
};

function createButtonsPanel() {
   let parent = document.querySelector('.b-wrapper-vidjet__btns-panel');
   parent.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
         vidjetEngine(event.target.id);
      }    
   })
   return parent;
};




//~~~~~Подмодуль "Спиннер"~~~~~//
let spinner = document.querySelector('.spinner');

function switchSpinner() {
   if (spinner.classList.contains('spinner-show')) {
      spinner.classList.remove('spinner-show', 'fa-pulse', 'fas')
   }
   else {
      spinner.classList.add('spinner-show', 'fa-pulse', 'fas')
   }
};




//~~~~~Подмодуль "Скрытие данных"~~~~~//
let bodyVidjet = document.querySelector('.b-wrapper-vidjet__body-vidjet')

function switchBodyVidjet() {
   bodyVidjet.style.visibility = bodyVidjet.style.visibility === 'hidden' ? 'visible' : 'hidden';
};






/////МОДУЛЬ API зарпоса//////
let HTML = {
   city: document.querySelector(".city"),
   temperature: document.querySelector(".temperature"),
   disclaimer: document.querySelector(".disclaimer"),
   pressure: document.querySelector(".pressure"),
   icon: document.querySelector(".icon")
};
const date_init = new Date();//используется в dateEngine() и isDaylightHour()
let timeZones = {
   '-7': 5551752,
   '-6': 5419384,
   '-5': 3688689,
   '-4': 4568138,
   '-3': 3441575,
   '-1': 3372783,
   '0': 2643743,
   '1': 2950159,
   '2': 703448,
   '3': 524901,
   '4': 499099,
   '5': 1174872,
   '6': 1526273,
   '7': 1609350,
   '8': 1880252,
   '9': 1835848,
   '10': 4043988,
   '11': 2123628,
   '12': 2205218,
}
let capital = startCityAPI(); //default city "Dublin, IE"


callAPI(capital);


function callAPI(capital) {
   fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${capital}&appid=26c46f6f0e712ec726a7e04d9ed513fc`
   )
      .then(function (resp) {
         return resp.json();
      })
      .then(function (data) {
         getInfoToHTML(data);
      })
      .catch(() => {
         alert("Произошла ошибка запроса данных");
      });
};




//~~~~~Подмодуль "Вывод API данных"~~~~~//
function getInfoToHTML(dataFromApi) {
   HTML.city.innerHTML = dataFromApi.name;
   HTML.temperature.innerHTML = Math.round(dataFromApi.main.temp - 273) + "&deg";
   HTML.disclaimer.textContent = dataFromApi.weather[0]["description"];
   HTML.pressure.textContent = `Wind ${dataFromApi.wind.speed} m/s`;
   HTML.icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${dataFromApi.weather[0]["icon"]}@2x.png">`;
}

//~~~~~Подмодуль "Локальный часовой пояс"~~~~~//
//Работает на объекте date_init (из Date module)


function localTimeZone() {
   return (date_init.getTimezoneOffset() / 60) * -1;
}

console.log(localTimeZone());

function startCityAPI() {
   return timeZones[localTimeZone()]
}

console.log(startCityAPI());





/////Date module//////
let clockElements = [//To create module elements.
   { tag: 'article', classHTML: 'b-clock' },
   { tag: 'div', classHTML: 'b-clock__time'},
   { tag: 'div', classHTML: 'b-clock__date'}
];

createHTMLElements(clockElements);


let whereFromDateModule = {
   currentDateOut: document.querySelector('.b-clock__date'),
   currentTimeOut: document.querySelector('.b-clock__time'),
}
let what = {
   currentDate: '',
}

//[Основной часовой модуль]//
clockEngine();

//[Подмодуль "День или ночь"]//
// isDaylightHour();

//[Подмодуль "День и месяц"]//
dateEngine();
writeFromJsToDom(whereFromDateModule.currentDateOut, what.currentDate);


function clockEngine() {
   let date = new Date();
   let hour = date.getHours();
   let minute = date.getMinutes();
   let second = date.getSeconds();
   let timeOut = whereFromDateModule.currentTimeOut;

   hour = (hour < 10) ? '0' + hour : hour;
   minute = (minute < 10) ? '0' + minute : minute;
   second = (second < 10) ? '0' + second : second;

   timeOut.innerHTML = `${hour}:${minute}:${second}`;
   setTimeout(clockEngine, 1000);
};

function writeFromJsToDom(where, what) {
   where.innerHTML = what;
}




//~~~~~Подмодуль "День или ночь"~~~~~//
//Работает на объекте date_init (из Date module)
function isDaylightHour() {
   let hour = date_init.getHours();
   return hour >= 8 && hour <= 18 ? true : false;
}




//~~~~~Подмодуль "День и месяц"~~~~~//
//Работает на объекте date_init (из Date module)
function dateEngine() {
   let weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
   let dayWeek = weekDays[date_init.getDay()];

   let dayMonth = date_init.getDate();

   let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov','Dec'];
   let month = months[date_init.getMonth()];

   what.currentDate = `${dayWeek} ${dayMonth} ${month}`;
}






















