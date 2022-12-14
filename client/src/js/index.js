// Import functions
import {initdb, postDb, deleteDb, editDb} from './database';
import {fetchCards} from './cards';
import { toggleForm, clearForm } from './form';

// Import CSS files
import "../css/index.css";

// Import Bootstrap
import { Tooltip, Toast, Popover } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import images
import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';

// On load functionality
window.addEventListener('load', function () {
  initdb();
  fetchCards();
  document.getElementById('logo').src = Logo;
  document.getElementById('bearThumbnail').src = Bear;
  document.getElementById('dogThumbnail').src = Dog;
});

// Form functionality
const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
let submitBtnToUpdate = false;
let profileId;

newContactButton.addEventListener('click', event => {
 toggleForm()
})

form.addEventListener('submit', (event) => {
  // handle the form data
  event.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let profile = document.querySelector('input[type="radio"]:checked').value;

  // Post form data to IndexedDB OR Edit an existing card in IndexedDB
  if (submitBtnToUpdate == false) {
    postDb(name, email, phone, profile);
  } else {

    // Obtains values passed into the form element
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let profile = document.querySelector('input[type="radio"]:checked').value;

   // Calls the editDB function passing in any values from the form element as well as the ID of the contact that we are updating
   editDb(profileId, name, email, phone, profile);

   fetchCards();

   // Toggles the submit button back to POST functionality
   submitBtnToUpdate = false;
  }
  
  // Clear form
  clearForm();
  // Toggle form
  toggleForm();
  // Reload the DOM
  fetchCards();
})

// Card functionality
// Adds deleteCard() to the global scope so each card has access to it.
window.deleteCard = (e) => {
  let id = parseInt(e.id);
  // delete card and reload the DOM
  deleteDb(id);
  fetchCards();
};

window.editCard = (e) => {
  // grabs the current dataset for this element from the db & pre-populates the edit form
  profileId = parseInt(e.dataset.id);
  
   // grabs the current dataset for this element from the db & pre-populates the edit form
  let editName = e.dataset.name;
  let editEmail = e.dataset.email;
  let editPhone = e.dataset.phone;
  document.getElementById("name").value = editName;
  document.getElementById("email").value = editEmail;
  document.getElementById("phone").value = editPhone;
  // small style adjustment for ui
  form.style.display = "block";
  
  // Toggles the submit button so that it now Updates an existing contact instead of posting a new one
  submitBtnToUpdate = true;
};
