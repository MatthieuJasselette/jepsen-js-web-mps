
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

//Arrays pour stocker les éléments
let headingArray = [];
let paragraphArray = [];
let commentArray = [];

// Fait apparaître la modale qui permet d'ajouter une idée.
let addNewIdea = () => {
      let projectNumber = headingArray.length;
      headingArray.push(document.getElementById("addIdeaName").value);
      paragraphArray.push(document.getElementById("addIdeaDescription").value)
      let contentDiv = document.getElementById("ideaBox");
      let ideaDiv = document.createElement("div");
        ideaDiv.className = "ideaElement";
      let newHeading = document.createElement("button");
        newHeading.className = "newButton displayHeading titre";
        newHeading.setAttribute("type", "button");
        newHeading.setAttribute("data-toggle", "modal");
        newHeading.setAttribute("data-target", "#displayModal");
        newHeading.setAttribute("name", "display");
        newHeading.onclick = () => {  //ajouter script pou ouvrir modale ?
         displayProject(projectNumber);
       };
      let newParagraph = document.createElement("p");
        newParagraph.className = "displayParagraph paragraphe";
      contentDiv.appendChild(ideaDiv);
        ideaDiv.appendChild(newHeading);
          newHeading.innerText = headingArray[projectNumber];
        ideaDiv.appendChild(newParagraph);
          newParagraph.innerHTML = markdown.toHTML(paragraphArray[projectNumber]);
};

let displayProject = (index) => {
  //remplit les champs vides de la modale
  document.getElementById("displayName").innerText = headingArray[index];
  document.getElementById("displayDescription").innerHTML = markdown.toHTML(paragraphArray[index]);
  //code du bouton pour appeler openEditProject /!\ utiliser onclick plutôt que addEventListener car il ne s'accumule pas.
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

let openEditProject = (index) => {
  document.getElementById("displayName").innerHTML = '<input type="text" id="editHeading" value="'+headingArray[index]+'">';
  document.getElementById("displayDescription").innerHTML = '<input type="text" id="editDescription" value="'+paragraphArray[index]+'">';
};

let closeEditProject = (index) => {
  headingArray[index] = document.getElementById("editHeading").value;
  paragraphArray[index] = document.getElementById("editDescription").value;
  document.getElementById("displayBox").innerHTML = '<h5 id="displayName"></h5>  <p id="displayDescription"></p>'
  document.getElementById("displayName").innerText = headingArray[index];
  document.getElementById("displayDescription").innerHTML = markdown.toHTML(paragraphArray[index]);
  document.getElementsByClassName("displayHeading")[index].innerText = headingArray[index];
  document.getElementsByClassName("displayParagraph")[index].innerHTML = markdown.toHTML(paragraphArray[index]);
}

let removeProject = (index) => {
  headingArray.splice(index, 1);
  paragraphArray.splice(index,1);
  let removeTarget = document.getElementsByClassName("ideaElement")[index]
  removeTarget.parentNode.removeChild(removeTarget);
  let ideas = document.getElementsByClassName("ideaElement");
  for(let i = index ; i < ideas.length ; i++) {
    ideas[i].querySelector("button").onclick = () => {
      displayProject(i);
    };
  }
};

//à peaufiner
// let addComment = () => {
//   //commentArray.push() ;
//   let commentDiv = document.getElementById("commentBox");
//   let newComment = document.createElement("p");
//   commentDiv.appendChild(newComment);
//   newComment.innerText = document.getElementById("commentIdea").value;
// };

//let ideaStorage = []; Possiblement à virer, pas encore certain

//code du bouton pour appeler addNewIdea

document.getElementsByClassName("btn btn-primary")[0].addEventListener('click', () => {
  addNewIdea();
  document.getElementById("addIdeaName").value = null;
  document.getElementById("addIdeaDescription").value = null;
});

// //code du bouton pour appeler addComment
// document.getElementsByClassName("commentButton")[0].addEventListener('click', () => {
//   addComment();
//   document.getElementById("commentIdea").value = '';
// });

//  Fction pour clear le local storage et réenregistrer les éléments présents sur la page.
let updateLocalStorage = () => {
  localStorage.clear();
  for (let i = 0; i < headingArray.length; i++) {
    localStorage.setItem(headingArray[i], paragraphArray[i]);
  };
};

// Update du local storage uniquement lorsqu'on quitte ou reload la page.
window.addEventListener("beforeunload", () => {
  updateLocalStorage()
});



//Fonction pour importer le localStorage dans la div IdeaBox
let importLocalStorage = () => {
  headingArray = [];
  paragraphArray = [];

  for (let i = 0; i < localStorage.length; i++) {
    headingArray.push(localStorage.key(i));
    paragraphArray.push (localStorage.getItem(localStorage.key(i)));
  }

  if (localStorage.length > 0) {
    for (let i = 0; i < headingArray.length; i++) {
      let contentDiv = document.getElementById("ideaBox");
      let ideaDiv = document.createElement("div");
      ideaDiv.className = "ideaElement";
      let newHeading = document.createElement("button");
      newHeading.className = "newButton displayHeading titre"; //sert pour retrouver les éléments et les modifier dans la page
      newHeading.setAttribute("type", "button");
      newHeading.setAttribute("data-toggle", "modal");
      newHeading.setAttribute("data-target", "#displayModal");
      newHeading.setAttribute("name", "display");
      newHeading.onclick = () => {
        //ouvrir modale ?
       displayProject(i);
      };
      let newParagraph = document.createElement("p");
      newParagraph.className = "displayParagraph paragraphe";
      contentDiv.appendChild(ideaDiv);
      ideaDiv.appendChild(newHeading);
      newHeading.innerText = headingArray[i];
      ideaDiv.appendChild(newParagraph);
      newParagraph.innerHTML = markdown.toHTML(paragraphArray[i]);
    }
  } else {
    return;
  }
};
// Import du local storage se lance au load de la fenêtre.
window.onload = function() {
  importLocalStorage();
} ;
