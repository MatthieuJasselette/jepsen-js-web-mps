
// import some polyfill to ensure everything works OK
import "babel-polyfill"

// import bootstrap's javascript part
import 'bootstrap';

// import the style
import "./style.scss";

/*
  Put the JavaScript code you want below.
*/

//Arrays pour stocker les éléments
let headingArray = [];
let paragraphArray = [];
let commentArray = [];

//fonctionne /intégrer les éléments à un array.
let addNewIdea = () => {
  let projectNumber = headingArray.length;
  headingArray.push(document.getElementById("addIdeaName").value);
  paragraphArray.push(document.getElementById("addIdeaDescription").value)
  let contentDiv = document.getElementById("ideaBox");
  let ideaDiv = document.createElement("div");
    ideaDiv.className = "ideaElement";
  let newHeading = document.createElement("button");
    newHeading.className = "newButton displayButton";
    newHeading.setAttribute("type", "button");
    newHeading.setAttribute("data-toggle", "modal");
    newHeading.setAttribute("data-target", "#displayModal");
    newHeading.setAttribute("name", "display");
    newHeading.addEventListener('click', () => {
      displayProject(projectNumber);
    });
  let newParagraph = document.createElement("p");
    contentDiv.appendChild(ideaDiv);
  ideaDiv.appendChild(newHeading);
  newHeading.innerText = headingArray[projectNumber];
  ideaDiv.appendChild(newParagraph);
  newParagraph.innerText = paragraphArray[projectNumber];
};

//fonctionne
let displayProject = (index) => {
  document.getElementById("displayName").innerText = headingArray[index] ;
  document.getElementById("displayDescription").innerText = paragraphArray[index];
};

// let editProject = (index) => {
//   document.getElementById("displayBox").innerHTML = '<input type="text" id="editHeading" value="'headingArray[index]'">','<input type="text" id="editDescription" value="p'aragraphArray[index]'">';
// };

//fonctionne
let addComment = () => {
  let commentDiv = document.getElementById("commentBox");
  let newComment = document.createElement("p");
  commentDiv.appendChild(newComment);
  newComment.innerText = document.getElementById("commentIdea").value;
};

let ideaStorage = [];

//code du bouton pour appeler addNewIdea
document.getElementsByClassName("btn btn-primary")[0].addEventListener('click', () => {
  addNewIdea();
  document.getElementById("addIdeaName").value = '';
  document.getElementById("addIdeaDescription").value = '';
});

//code du bouton pour appeler editProject
document.getElementsByClassName("editButton")[0].addEventListener('click', () => {
  editProject();
});
//code du bouton pour appeler addComment
document.getElementsByClassName("commentButton")[0].addEventListener('click', () => {
  addComment();
  document.getElementById("commentIdea").value = '';
});
// });
