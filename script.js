
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

//code pour update les arrays avec le contenu local-storage

//fonctionne /intégrer les éléments à un array.
let addNewIdea = () => {
  let projectNumber = headingArray.length;
  headingArray.push(document.getElementById("addIdeaName").value);
  paragraphArray.push(document.getElementById("addIdeaDescription").value)
  let contentDiv = document.getElementById("ideaBox");
  let ideaDiv = document.createElement("div");
    ideaDiv.className = "ideaElement";
  let newHeading = document.createElement("button");
    newHeading.className = "newButton displayHeading"; //sert pour retrouver les éléments et les modifier dans la page
    newHeading.setAttribute("type", "button");
    newHeading.setAttribute("data-toggle", "modal");
    newHeading.setAttribute("data-target", "#displayModal");
    newHeading.setAttribute("name", "display");
    //newHeading.setAttribute("id", "idHeading"+projectNumber);
    newHeading.onclick = () => {
      displayProject(projectNumber);
    };
  let newParagraph = document.createElement("p");
    newParagraph.className = "displayParagraph"; //sert pour retrouver les éléments et les modifier dans la page
    //newParagraph.setAttribute("id", "idParagraph"+projectNumber)
  contentDiv.appendChild(ideaDiv);
    ideaDiv.appendChild(newHeading);
      newHeading.innerText = headingArray[projectNumber];
    ideaDiv.appendChild(newParagraph);
      newParagraph.innerText = paragraphArray[projectNumber];
};


//fonctionne
let displayProject = (index) => {
  //remplit les champs vides de la modale
  document.getElementById("displayName").innerText = headingArray[index];
  document.getElementById("displayDescription").innerText = paragraphArray[index];
  //code du bouton pour appeler openEditProject
  // /!\ utiliser onclick plutôt que addEventListener car il ne s'accumule pas.
  document.getElementsByClassName("openEditButton")[0].onclick = () => {
    openEditProject(index);
  };
  //code du bouton pour appeler closeEditProject
  document.getElementsByClassName("closeEditButton")[0].onclick = () => {
    closeEditProject(index);
  };
  //code du bouton pour appeler deleteProject
  document.getElementsByClassName("deleteButton")[0].onclick = () => {
    removeProject(index);
  };
};

//code du bouton "Edit your project"
let openEditProject = (index) => {
  document.getElementById("displayName").innerHTML = '<input type="text" id="editHeading" value="'+headingArray[index]+'">';
  document.getElementById("displayDescription").innerHTML = '<input type="text" id="editDescription" value="'+paragraphArray[index]+'">';
};


//code du bouton "Submit your edited project"
let closeEditProject = (index) => {
  headingArray[index] = document.getElementById("editHeading").value;
  paragraphArray[index] = document.getElementById("editDescription").value;
  document.getElementById("displayBox").innerHTML = '<h5 id="displayName"></h5>  <p id="displayDescription"></p>'
  document.getElementById("displayName").innerText = headingArray[index];
  document.getElementById("displayDescription").innerText = paragraphArray[index];
  displayProject(index);
  document.getElementsByClassName("displayHeading")[index].innerText = headingArray[index];
  document.getElementsByClassName("displayParagraph")[index].innerText = paragraphArray[index]
}

let removeProject = (index) => {
  headingArray.splice(index, 1);
  paragraphArray.splice(index,1);
  let removeTarget = document.getElementsByClassName("ideaElement")[index]
  //fonctionne
  removeTarget.parentNode.removeChild(removeTarget);

  let ideas = document.getElementsByClassName("ideaElement");
  for(let i = index ; i < ideas.length ; i++) {
    ideas[index].querySelector("button").onclick = () => {
      displayProject(i);
    };
  };
};

/*code à Alex qui retire les éléments d'une modale.
let element = document.querySelector("#displayBox"); while (element.firstChild) { element.removeChild(element.firstChild); }*/

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

//code du bouton pour appeler addComment
document.getElementsByClassName("commentButton")[0].addEventListener('click', () => {
  addComment();
  document.getElementById("commentIdea").value = '';
});

//code du bouton pour appeler openEditProject
// document.getElementsByClassName("openEditButton")[0].addEventListener('click', () => {
//   openEditProject();
// });

// //code du bouton pour appeler closeEditProject
// document.getElementsByClassName("closeEditButton")[0].addEventListener('click', () => {
//   closeEditProject();
// });
