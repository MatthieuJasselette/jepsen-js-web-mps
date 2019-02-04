
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
  let newHeading = document.createElement("button");
  newHeading.className = "newButton";
  newHeading.setAttribute("type", "button");
  newHeading.setAttribute("data-toggle", "modal");
  newHeading.setAttribute("data-target", "#displayModal");
  newHeading.setAttribute("name", "display");
  newHeading.setAttribute("id", "displayButton");
  let newParagraph = document.createElement("p");
  contentDiv.appendChild(ideaDiv);
  ideaDiv.appendChild(newHeading);
  newHeading.innerText = document.getElementById("addIdeaName").value;
  ideaDiv.appendChild(newParagraph);
  newParagraph.innerText = document.getElementById("addIdeaDescription").value;
};

let addComment = () => {
  let commentDiv = document.getElementById("commentBox");
  let newComment = document.createElement("p");
  commentDiv.appendChild(newComment)
  newComment.innerText = document.getElementById("commentIdea").value;
}
// <button class ="newButton" type="button" data-toggle="modal"
//   data-target="#displayModal" name="display" id ="displayButton"></button>

let ideaStorage = [];

//code pour ajouter un projet
document.getElementsByClassName("btn btn-primary")[0].addEventListener('click', () => {
  addNewIdea();
  document.getElementById("addIdeaName").value = '';
  document.getElementById("addIdeaDescription").value = '';
});

//code pour ajouter un commentaire
document.getElementsByClassName("commentButton")[0].addEventListener('click', () => {
  addComment();
  document.getElementById("commentIdea").value = '';
});
