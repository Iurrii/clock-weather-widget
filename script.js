let cityArray = [
   { cityName: "Krasnodar", cityId: 542420 },
   { cityName: "Moscow", cityId: 524894 },
   { cityName: "Samara", cityId: 499099 },
   { cityName: "Tula", cityId: 480562 }
];





// widgetInitializationInHTML();
// btnsPanelInitializationInHTML();

function widgetInitializationInHTML() {
   let sectionVrapper = document.createElement('section')
   sectionVrapper.className = 'wrapper';
   document.body.append(sectionVrapper);

   let divBodyVidjet = document.createElement('div')
   divBodyVidjet.className = 'body-vidjet';
   sectionVrapper.append(divBodyVidjet);

   let cityName = document.createElement('h2');
   cityName.className = 'city';
   sectionVrapper.append(cityName);

   let temperature = document.createElement('p');
   temperature.className = 'temperature';
   sectionVrapper.append(temperature);

   let disclaimer = document.createElement('p');
   disclaimer.className = 'disclaimer';
   sectionVrapper.append(disclaimer);

   let iconWeather = document.createElement('p');
   iconWeather.className = 'icon';
   sectionVrapper.append(iconWeather);

   let pressure = document.createElement('small');
   pressure.className = 'pressure';
   sectionVrapper.append(pressure);
}


function btnsPanelInitializationInHTML() {
   let btnsPanel = document.createElement('div');
   btnsPanel.className = 'bts-panel';
   document.body.append(btnsPanel);

   btnsPanel.innerHTML = `${cityArray
      .map((i) => `<button id="${i.cityId}" class="btnCity">${i.cityName}</button>`)
      .join("")}`;
}





printBtn();

function printBtn() {
   for (var i = 0; i < cityArray.length; i++) {
      var btn = document.createElement("button");
      var t = document.createTextNode(cityArray[i]['cityName']);
      let z = document.createTextNode(cityArray[i]['cityId']);
      console.log(typeof btn);
      btn.append(t);
      btn.id = (z.nodeValue)
      document.body.append(btn);
   }
}