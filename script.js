let cityArray = [
   { cityName: "Krasnodar", cityId: 542420 },
   { cityName: "Moscow", cityId: 524894 },
   { cityName: "Samara", cityId: 499099 },
   { cityName: "Tula", cityId: 480562 }
];

let htmlElements = [
   {tag: 'section', classHTML: 'wrapper'},
   {tag: 'div', classHTML: 'body-vidjet'},
   { tag: 'h2', classHTML: 'city' },
   { tag: 'p', classHTML: 'temperature' },
   { tag: 'p', classHTML: 'disclaimer' },
   { tag: 'p', classHTML: 'icon' },
   { tag: 'small', classHTML: 'pressure' },
   ];

function createHTMLElements(x) {
   x.forEach((item) => {

      let { tag, classHTML } = item;
      let htmlElement = document.createElement(`${tag}`);
      htmlElement.classList = `${classHTML}`;


      if (htmlElement.className === 'wrapper') {
         document.body.append(htmlElement);
         // console.log(htmlElement);
         htmlElement = '';
      }
      if (htmlElement.className === 'body-vidjet') {
         document.querySelector('.wrapper').append(htmlElement);
         htmlElement = '';
         // console.log(htmlElement);
      }
      if (htmlElement) {//почему дальше шла пустая строка???
         document.querySelector('.body-vidjet').append(htmlElement);
      }

   });
};

createHTMLElements(htmlElements);







// widgetInitializationInHTML();
// btnsPanelInitializationInHTML();

// function widgetInitializationInHTML() {
//    let sectionVrapper = document.createElement('section')
//    sectionVrapper.className = 'wrapper';
//    document.body.append(sectionVrapper);

//    let divBodyVidjet = document.createElement('div')
//    divBodyVidjet.className = 'body-vidjet';
//    sectionVrapper.append(divBodyVidjet);

//    let cityName = document.createElement('h2');
//    cityName.className = 'city';
//    sectionVrapper.append(cityName);

//    let temperature = document.createElement('p');
//    temperature.className = 'temperature';
//    sectionVrapper.append(temperature);

//    let disclaimer = document.createElement('p');
//    disclaimer.className = 'disclaimer';
//    sectionVrapper.append(disclaimer);

//    let iconWeather = document.createElement('p');
//    iconWeather.className = 'icon';
//    sectionVrapper.append(iconWeather);

//    let pressure = document.createElement('small');
//    pressure.className = 'pressure';
//    sectionVrapper.append(pressure);
// }


function btnsPanelInitializationInHTML() {
   let btnsPanel = document.createElement('div');
   btnsPanel.className = 'bts-panel';
   document.body.append(btnsPanel);

   btnsPanel.innerHTML = `${cityArray
      .map((i) => `<button id="${i.cityId}" class="btnCity">${i.cityName}</button>`)
      .join("")}`;
}






function printBtn() {
   for (var i = 0; i < cityArray.length; i++) {
      var btn = document.createElement("button");
      var t = document.createTextNode(cityArray[i]['cityName']);
      let z = document.createTextNode(cityArray[i]['cityId']);
      btn.append(t);
      btn.id = (z.nodeValue)
      document.body.append(btn);
   }
}

// function createHTMLElements(x) {
//    x.forEach((item) => {
//       let { tag, classHTML } = item;
//       let htmlElement = document.createElement(`${tag}`);
//       htmlElement.classList = `${classHTML}`;
//       document.body.append(htmlElement);
//    });
// };