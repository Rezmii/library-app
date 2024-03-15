const myLibrary = [];
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const radioInputs = document.querySelectorAll('input[name="read"]');
const libraryDiv = document.querySelector(".library-div");

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector(".close-button");
const dialogAddButton = document.querySelector("dialog .add-button");

const book1 = new Book(
  "Harry Potter and the Sorcerer's Stone",
  "J.K. Rowling",
  223,
  "In Progress"
);
const book2 = new Book(
  "A Game of Thrones",
  "George R.R. Martin",
  694,
  "Not Started"
);
const book3 = new Book("Salem's Lot", "Stephen King", 525, "Read");
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

Book.prototype.changeStatus = function () {
  switch (this.read) {
    case "Read":
      this.read = "In Progress";
      break;
    case "In Progress":
      this.read = "Not Started";
      break;
    case "Not Started":
      this.read = "Read";
      break;
    default:
      break;
  }
};

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

displayBooks(myLibrary);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

dialogAddButton.addEventListener("click", () => {
  let radioInput = checkRadioInput();
  if (
    titleInput.value !== "" &&
    authorInput.value !== "" &&
    pagesInput.value !== ""
  ) {
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      radioInput
    );
    displayBooks(myLibrary);
  } else alert("gowno");
  dialog.close();
});

function checkRadioInput() {
  let selectedValue = "";

  radioInputs.forEach(function (radioInput) {
    if (radioInput.checked) {
      selectedValue = radioInput.value;
    }
  });

  return selectedValue;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBooks(myLibrary) {
  libraryDiv.innerHTML = "";

  myLibrary.forEach((i, index) => {
    let divElement = document.createElement("div");

    let deleteButtonElement = addDeleteButtonToDiv(index);
    divElement.appendChild(deleteButtonElement);

    for (const [key, value] of Object.entries(i)) {
      let pElement = addParagraphToDiv(key, value);
      divElement.appendChild(pElement);
    }

    let read = i.read;
    let toggleButtonElement = addToggleButtonToDiv(index, read);

    divElement.appendChild(toggleButtonElement);

    libraryDiv.appendChild(divElement);
  });

  addToggleButtonsListeners();
  addDeleteButtonsListeners();
}

function addDeleteButtonToDiv(index) {
  let buttonElement = document.createElement("button");
  let buttonText = document.createTextNode("X");
  buttonElement.appendChild(buttonText);
  buttonElement.classList.add("delete-button");
  buttonElement.setAttribute("data-id", index);

  return buttonElement;
}

function addToggleButtonToDiv(index, read) {
  let buttonElement = document.createElement("button");
  let buttonClass;

  switch (read) {
    case "Read":
      buttonClass = "read";
      break;
    case "In Progress":
      buttonClass = "in-progress";
      break;
    case "Not Started":
      buttonClass = "not-started";
      break;
    default:
      break;
  }

  buttonElement.classList.add("toggle-button", buttonClass);
  buttonElement.setAttribute("data-id", index);

  return buttonElement;
}

function addDeleteButtonsListeners() {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      deleteBook(deleteButton.dataset.id, myLibrary);
    });
  });
}

function addToggleButtonsListeners() {
  const toggleButtons = document.querySelectorAll(".toggle-button");
  toggleButtons.forEach((toggleButton) => {
    toggleButton.addEventListener("click", () => {
      toggleRead(toggleButton.dataset.id, myLibrary);
    });
  });
}

function addParagraphToDiv(key, value) {
  let pElement = document.createElement("p");
  let result = key.charAt(0).toUpperCase() + key.slice(1);
  let arrVal = document.createTextNode(`${result}: `);

  let strongElement = document.createElement("strong");
  strongElement.appendChild(arrVal);
  pElement.appendChild(strongElement);

  let valueText = document.createTextNode(value);
  pElement.appendChild(valueText);
  return pElement;
}

function deleteBook(id, myLibrary) {
  myLibrary.forEach((_, i) => {
    if (id == i) {
      delete myLibrary[i];
      displayBooks(myLibrary);
    }
  });
}

function toggleRead(id, myLibrary) {
  myLibrary.forEach((val, i) => {
    if (id == i) {
      val.changeStatus();
    }
  });
  displayBooks(myLibrary);
}
