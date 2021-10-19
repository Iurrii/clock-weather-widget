//////МОДУЛЬ РАЗМЕТКИ//////
let htmlElements = [
   { tag: 'article', classHTML: 'b-wrapper-vidjet'},
   { tag: 'section', classHTML: 'b-wrapper-vidjet__body-vidjet'},
   { tag: 'h2', classHTML: 'city' },
   { tag: 'p', classHTML: 'temperature' },
   { tag: 'p', classHTML: 'disclaimer' },
   { tag: 'p', classHTML: 'icon' },
   { tag: 'small', classHTML: 'pressure' },
   { tag: 'section', classHTML: 'b-wrapper-vidjet__btns-panel'}
   ];


createHTMLElements(htmlElements);


function createHTMLElements(x) {
   x.forEach((item) => {

      let { tag, classHTML } = item;
      let htmlElement = document.createElement(`${tag}`);
      htmlElement.classList = `${classHTML}`;

      if (isElenentWithСlass(htmlElement, 'b-wrapper-vidjet') || isElenentWithСlass(htmlElement, 'b-clock')) {
         document.body.append(htmlElement);
         htmlElement = '';
      }
      if (isElenentWithСlass(htmlElement, 'b-wrapper-vidjet__body-vidjet') || isElenentWithСlass(htmlElement,'b-wrapper-vidjet__btns-panel')) {
         document.querySelector('.b-wrapper-vidjet').append(htmlElement);
         htmlElement = '';
      }
      if (isElenentWithСlass(htmlElement, 'b-clock__time') || isElenentWithСlass(htmlElement, 'b-clock__date')) {
         document.querySelector('.b-clock').append(htmlElement);
         htmlElement = '';
      }
      if (htmlElement) {
         document.querySelector('.b-wrapper-vidjet__body-vidjet').append(htmlElement);
      }
   });
};

function isElenentWithСlass(element, htmlClass) {
   if (element.className === `${htmlClass}`) {
      return true
   }
   else {
      return false
   }
};





//////МОДУЛЬ КНОПОК//////
let сities = [
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
}



/////МОДУЛЬ API ЗАПРОСОВ//////
let HTML = {
   city: document.querySelector(".city"),
   temperature: document.querySelector(".temperature"),
   disclaimer: document.querySelector(".disclaimer"),
   pressure: document.querySelector(".pressure"),
   icon: document.querySelector(".icon")
};
let capital = 524894; //город по умолчанию Москва


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
      .catch(function () {
         alert("Произошла ошибка запроса данных");
      });
}

function getInfoToHTML(dataFromApi) {
   HTML.city.innerHTML = dataFromApi.name;
   HTML.temperature.innerHTML = Math.round(dataFromApi.main.temp - 273) + "&deg";
   HTML.disclaimer.textContent = dataFromApi.weather[0]["description"];
   HTML.pressure.textContent = `${dataFromApi.main.pressure} гПа`;
   HTML.icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${dataFromApi.weather[0]["icon"]}@2x.png">`;
}



/////МОДУЛЬ ЧАСОВ//////
let clockElements = [
   { tag: 'article', classHTML: 'b-clock' },
   { tag: 'div', classHTML: 'b-clock__time'},
   { tag: 'div', classHTML: 'b-clock__date'}
];


createHTMLElements(clockElements);

clockEngine();
dateEngine();


function clockEngine() {
   let date = new Date();
   let hour = date.getHours();
   let minute = date.getMinutes();
   let second = date.getSeconds();
   let timeOut = document.querySelector('.b-clock__time');

   hour = (hour < 10) ? '0' + hour : hour;
   minute = (minute < 10) ? '0' + minute : minute;
   second = (second < 10) ? '0' + second : second;

   timeOut.innerHTML = `${hour}:${minute}:${second}`;

   setTimeout(clockEngine, 1000);
};

function dateEngine() {
   let date = new Date();
   let weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
   let dayWeek = weekDays[date.getDay()];
   let dayOut = document.querySelector('.b-clock__date');
   dayOut.innerHTML = `${dayWeek}`;
}