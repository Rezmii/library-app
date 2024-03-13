const myLibrary = [];
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const libraryDiv = document.querySelector(".library-div");

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector(".close-button");
const dialogAddButton = document.querySelector("dialog .add-button");

const book = new Book(
  "Harry Potter and the Sorcerer's Stone",
  "J.K. Rowling",
  223,
  "Yes"
);
myLibrary.push(book);

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
  if (
    titleInput.value !== "" &&
    authorInput.value !== "" &&
    pagesInput.value !== ""
  ) {
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readInput.value
    );
    displayBooks(myLibrary);
  } else alert("gowno");
  dialog.close();
});

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBooks(myLibrary) {
  libraryDiv.innerHTML = "";

  myLibrary.forEach((i, index) => {
    let divElement = document.createElement("div");

    let buttonElement = addDeleteButtonToDiv(index);
    divElement.appendChild(buttonElement);

    for (const [key, value] of Object.entries(i)) {
      let pElement = addParagraphToDiv(key, value);
      divElement.appendChild(pElement);
    }

    libraryDiv.appendChild(divElement);
  });

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

function addDeleteButtonsListeners() {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      deleteBook(deleteButton.dataset.id, myLibrary);
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
  myLibrary.forEach((val, i) => {
    if (id == i) {
      delete myLibrary[i];
      displayBooks(myLibrary);
    }
  });
}
