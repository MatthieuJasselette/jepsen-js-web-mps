
// import some polyfill to ensure everything works OK
import "babel-polyfill"

// import bootstrap's javascript part
import 'bootstrap';

// import the style
import "./style.scss";

/*
  Put the JavaScript code you want below.
*/

console.log("Hey look in your browser console. It works!");

let addNewIdea = () => {
  let contentDiv = document.getElementById("idBox");
  let newHeading = document.createElement("h2");
  let newParagraph = document.createElement("p");
  contentDiv.appendChild(newHeading);
  newHeading.innerText = document.getElementById("addIdeaName").value;
  contentDiv.appendChild(newParagraph);
  newParagraph.innerText = document.getElementById("addIdeaDescription").value;
  //contentDiv.innerHTML ="<h2>" + newHeading.value + "</h2><p>" + newParagraph.value + "</p>";//fonctionne
};

document.getElementsByClassName("btn btn-primary")[0].addEventListener('click', () => {
  addNewIdea();
});
