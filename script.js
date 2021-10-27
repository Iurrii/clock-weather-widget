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
   { tag: 'section', classHTML: 'b-wrapper-vidjet__btns-panel' }
];


createHTMLElements(htmlElements);


//~~~~~Подмодуль "Панель кнопок"~~~~~//
let сities = [//To create module elements.
   { tag: 'button', htmlClass: 'btn', cityName: "Krasnodar", id: 542420 },
   { tag: 'button', htmlClass: 'btn', cityName: "Moscow", id: 524894 },
   { tag: 'button', htmlClass: 'btn', cityName: "Samara", id: 499099 },
   { tag: 'button', htmlClass: 'btn', cityName: "Tula", id: 480562 }
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
         callAPI(event.target.id);
      }    
   })
   return parent;
};



/////МОДУЛЬ API зарпоса//////
let HTML = {
   city: document.querySelector(".city"),
   temperature: document.querySelector(".temperature"),
   disclaimer: document.querySelector(".disclaimer"),
   pressure: document.querySelector(".pressure"),
   icon: document.querySelector(".icon")
};
let capital = 524894; //default city Moscow


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
   HTML.pressure.textContent = `${dataFromApi.main.pressure} гПа`;
   HTML.icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${dataFromApi.weather[0]["icon"]}@2x.png">`;
}



/////Date module//////
let clockElements = [//To create module elements.
   { tag: 'article', classHTML: 'b-clock' },
   { tag: 'div', classHTML: 'b-clock__time'},
   { tag: 'div', classHTML: 'b-clock__date'}
];

createHTMLElements(clockElements);

const date_init = new Date();//используется в dateEngine() и isDaylightHour()
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








