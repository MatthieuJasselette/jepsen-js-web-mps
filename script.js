
// import some polyfill to ensure everything works OK
import "babel-polyfill"

// import bootstrap's javascript part
import 'bootstrap';

// import the style
import "./style.scss";

/*
  Put the JavaScript code you want below.
*/

let addNewIdea = () => {
  let contentDiv = document.getElementById("ideaBox");
  let ideaDiv = document.createElement("div");
  ideaDiv.className = "ideaElement";
  let newHeading = document.createElement("h2");
  let newParagraph = document.createElement("p");
  contentDiv.appendChild(ideaDiv);
  ideaDiv.appendChild(newHeading);
  newHeading.innerText = document.getElementById("addIdeaName").value;
  ideaDiv.appendChild(newParagraph);
  newParagraph.innerText = document.getElementById("addIdeaDescription").value;
};

document.getElementsByClassName("btn btn-primary")[0].addEventListener('click', () => {
  addNewIdea();
  document.getElementById("addIdeaName").value = '';
  document.getElementById("addIdeaDescription").value = '';
});



let updateLocalStorage = () => {
  localStorage.clear();
  let ideaStorage = [];

  let setTitleArray = () => {
    let childIdeaTitle = document.getElementById('ideaBox').getElementsByTagName('h2');
    for( let i = 0; i < childIdeaTitle.length; i++) {
      ideaStorage.push(childIdeaTitle[i].innerText)
    };
    return ideaStorage;
  };

  let descriptionStorage = [];

  let setDescriptionArray = () => {
    let childIdeaDescription = document.getElementById('ideaBox').getElementsByTagName('p');
    for( let i = 0; i < childIdeaDescription.length; i++) {
      descriptionStorage.push(childIdeaDescription[i].innerText)
    };
    return descriptionStorage;
  };

  setTitleArray();
  setDescriptionArray();


  for (let i = 0; i < ideaStorage.length; i++) {
    localStorage.setItem(ideaStorage[i], descriptionStorage[i]);
  };
};

  console.log(localStorage);
window.addEventListener("beforeunload", () => {
  updateLocalStorage()
});
