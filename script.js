
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

let ideaStorage = [];
document.getElementsByClassName("btn btn-primary")[0].addEventListener('click', () => {
  addNewIdea();
  document.getElementById("addIdeaName").value = '';
  document.getElementById("addIdeaDescription").value = '';
});
