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

let favoriteCount = 0;
let progressStatus = {
  Read: 1,
  "In Progress": 1,
  "Not Started": 1,
};

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
      progressStatus["In Progress"]++;
      if (progressStatus["Read"] > 0) progressStatus["Read"]--;
      break;
    case "In Progress":
      this.read = "Not Started";
      progressStatus["Not Started"]++;
      if (progressStatus["In Progress"] > 0) progressStatus["In Progress"]--;
      break;
    case "Not Started":
      this.read = "Read";
      progressStatus["Read"]++;
      if (progressStatus["Not Started"] > 0) progressStatus["Not Started"]--;
      break;
    default:
      break;
  }
};

Book.prototype.changeFavorite = function () {
  if (this.fav === false) {
    this.fav = true;
    favoriteCount++;
  } else {
    if (favoriteCount > 0) {
      this.fav = false;
      favoriteCount--;
    }
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
  this.fav = false;
}

dialogAddButton.addEventListener("click", () => {
  let radioInput = checkRadioInput();
  if (
    titleInput.value !== "" &&
    authorInput.value !== "" &&
    pagesInput.value !== "" &&
    pagesInput.value >= 0
  ) {
    addBookToLibrary(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      radioInput
    );
    displayBooks(myLibrary);
    dialog.close();
  } else {
    alert("Wrong input, try again");
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
  }
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

function addBookToLibrary(title, author, pages, read, fav = false) {
  const newBook = new Book(title, author, pages, read, fav);
  myLibrary.push(newBook);
  progressStatus[read]++;
  changeReadCount();
}

function displayBooks(myLibrary) {
  libraryDiv.innerHTML = "";

  myLibrary.forEach((i, index) => {
    let divElement = document.createElement("div");

    let deleteButtonElement = addDeleteButtonToDiv(index);
    divElement.appendChild(deleteButtonElement);

    for (const [key, value] of Object.entries(i)) {
      if (key !== "fav") {
        let pElement = addParagraphToDiv(key, value);
        divElement.appendChild(pElement);
      }
    }
    let buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons-div");
    divElement.appendChild(buttonsDiv);

    let read = i.read;
    let toggleButtonElement = addToggleButtonToDiv(index, read);
    let fav = i.fav;
    let favoriteButtonElement = addFavoriteButtonToDiv(index, fav);

    buttonsDiv.appendChild(favoriteButtonElement);
    buttonsDiv.appendChild(toggleButtonElement);

    libraryDiv.appendChild(divElement);
  });

  addToggleButtonsListeners();
  addFavoriteButtonListeners();
  addDeleteButtonsListeners();
  console.log(myLibrary);
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

function addFavoriteButtonToDiv(index, fav) {
  let buttonElement = document.createElement("button");
  let buttonClass = fav === false ? "not-favorite" : "favorite";

  buttonElement.classList.add("favorite-button", buttonClass);
  buttonElement.classList.add("favorite-button");
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

function addFavoriteButtonListeners() {
  const favoriteButtons = document.querySelectorAll(".favorite-button");
  favoriteButtons.forEach((favoriteButton) => {
    favoriteButton.addEventListener("click", () => {
      changeFavoriteStatus(favoriteButton.dataset.id, myLibrary);
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

  let spanElement = document.createElement("span");
  spanElement.textContent = value;

  if (key === "read") {
    spanElement.classList.add(getColorClassForStatus(value));
  }

  pElement.appendChild(spanElement);

  return pElement;
}

function getColorClassForStatus(status) {
  switch (status) {
    case "Read":
      return "read-text";
    case "In Progress":
      return "in-progress-text";
    case "Not Started":
      return "not-started-text";
    default:
      return "";
  }
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
  changeReadCount();
  displayBooks(myLibrary);
}

function changeFavoriteStatus(id, myLibrary) {
  myLibrary.forEach((val, i) => {
    if (id == i) {
      val.changeFavorite();
    }
  });
  changeFavoriteCount();
  displayBooks(myLibrary);
}

function changeFavoriteCount() {
  const pElement = document.querySelector(".favorite-p");
  pElement.textContent = `Favorite: ${favoriteCount}`;
}

function changeReadCount() {
  const pElements = document.querySelectorAll(".read-p");

  for (const key in progressStatus) {
    const index = Object.keys(progressStatus).indexOf(key);
    const value = progressStatus[key];
    pElements[index].textContent = `${key}: ${value}`;
  }
}
