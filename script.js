const myLibrary = [];
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const libraryDiv = document.querySelector(".library-div");

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");
const dialogAddButton = document.querySelector("dialog .add-button");

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
});

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBooks(myLibrary) {
  libraryDiv.innerHTML = "";

  myLibrary.forEach((i) => {
    let pElement = document.createElement("p");
    for (const [key, value] of Object.entries(i)) {
      let arrVal = document.createTextNode(`${key}: ${value}\n`);
      pElement.appendChild(arrVal);
      pElement.appendChild(document.createElement("br"));
      libraryDiv.appendChild(pElement);
    }
  });
}
