//////МОДУЛЬ РАЗМЕТКИ//////
let htmlElements = [
   {tag: 'article', classHTML: 'b-wrapper-vidjet'},
   {tag: 'section', classHTML: 'b-wrapper-vidjet__body-vidjet'},
   { tag: 'h2', classHTML: 'city' },
   { tag: 'p', classHTML: 'temperature' },
   { tag: 'p', classHTML: 'disclaimer' },
   { tag: 'p', classHTML: 'icon' },
   { tag: 'small', classHTML: 'pressure' },
   { tag: 'section', classHTML: 'b-wrapper-vidjet__btns-panel'}
   ];

function createHTMLElements(x) {
   x.forEach((item) => {

      let { tag, classHTML } = item;
      let htmlElement = document.createElement(`${tag}`);
      htmlElement.classList = `${classHTML}`;

      if (htmlElement.className === 'b-wrapper-vidjet') {
         document.body.append(htmlElement);
         htmlElement = '';
      }
      if (htmlElement.className === 'b-wrapper-vidjet__body-vidjet' || htmlElement.className === 'b-wrapper-vidjet__btns-panel') {
         document.querySelector('.b-wrapper-vidjet').append(htmlElement);
         htmlElement = '';
      }
      if (htmlElement) {
         document.querySelector('.b-wrapper-vidjet__body-vidjet').append(htmlElement);
      }
   });
};

createHTMLElements(htmlElements);



//////МОДУЛЬ КНОПОК//////
let сities = [
   { tag: 'button', htmlClass: 'btn', cityName: "Krasnodar", id: 542420 },
   { tag: 'button', htmlClass: 'btn', cityName: "Moscow", id: 524894 },
   { tag: 'button', htmlClass: 'btn', cityName: "Samara", id: 499099 },
   { tag: 'button', htmlClass: 'btn', cityName: "Tula", id: 480562 }
];

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
   let par = document.querySelector('.b-wrapper-vidjet__btns-panel');
   par.addEventListener('click', (event) => {
      if (event.target.tagName == 'BUTTON') {
         console.log('Нажатие на кнопку');
      }    
   })
   return par;
}

createButtons(сities, createButtonsPanel());