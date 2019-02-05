
// import some polyfill to ensure everything works OK
import "babel-polyfill"

// import bootstrap's javascript part
import 'bootstrap';

// import the style
import "./style.scss";
//import markdown
import {markdown} from 'markdown';

/*
  Put the JavaScript code you want below.
*/


// Fait apparaître la modale qui permet d'ajouter une idée.
let addNewIdea = () => {
  let contentDiv = document.getElementById("ideaBox");
  let newHeading = document.createElement("h2");
  newHeading.className = "titre";
  let newParagraph = document.createElement("p");
  newParagraph.className = "paragrahe";
  contentDiv.appendChild(newHeading);
  newHeading.innerText = document.getElementById("addIdeaName").value;
  contentDiv.appendChild(newParagraph);
  newParagraph.innerHTML = markdown.toHTML(document.getElementById("addIdeaDescription").value);
};

document.getElementsByClassName("btn btn-primary")[0].addEventListener('click', () => {
  addNewIdea();
  document.getElementById("addIdeaName").value = '';
  document.getElementById("addIdeaDescription").value = '';
});


//  Fction pour clear le local storage et réenregistrer les éléments présents sur la page.
let updateLocalStorage = () => {
  localStorage.clear();

  let ideaStorage = [];
  let childIdeaTitle = document.getElementById('ideaBox').getElementsByClassName('titre');
  let descriptionStorage = [];
  let childIdeaDescription = document.getElementById('ideaBox').getElementsByClassName('paragrahe');


  for( let i = 0; i < childIdeaTitle.length; i++) {
      ideaStorage.push(childIdeaTitle[i].innerText)
    };

  for( let i = 0; i < childIdeaDescription.length; i++) {
      descriptionStorage.push(childIdeaDescription[i].innerHTML)
    };

  for (let i = 0; i < ideaStorage.length; i++) {
    localStorage.setItem(ideaStorage[i], descriptionStorage[i]);
  };
};

// Update du local storage uniquement lorsqu'on quitte ou reload la page.
window.addEventListener("beforeunload", () => {
  updateLocalStorage()
});



//Fonction pour importer le localStorage dans la div IdeaBox
let importLocalStorage = () => {
  let localStorageTitle = [];
  let localStorageDescription = [];

  for (let i = 0; i < localStorage.length; i++) {
    localStorageTitle.push (localStorage.key(i));
    localStorageDescription.push (localStorage.getItem(localStorage.key(i)));
  }
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorageTitle.length; i++) {
      let contentDiv = document.getElementById("ideaBox");
      let newHeading = document.createElement("h2");
      let newParagraph = document.createElement("p");
      newHeading.className = "titre";
      newParagraph.className = "paragrahe";
      contentDiv.appendChild(newHeading);
      newHeading.innerText = localStorageTitle[i];
      contentDiv.appendChild(newParagraph);
      newParagraph.innerHTML = localStorageDescription[i];
    }
  } else {
    return;
  }
};
//localStorage.clear();

// Import du local storage se lance au load de la fenêtre.
window.onload = function() {
  importLocalStorage();
} ;
