// memulai script
window.onload = loadBooks;

let storage_key = "books";
let book_data = getBooks();
let formBooks = document.getElementById('form-add-books');
let inputTitle = document.getElementById("input-title");
let inputAuthor = document.getElementById("input-author");
let inputYear = document.getElementById("input-year");
let inputIsRead = document.getElementById("input-isread");
let buttonClear = document.getElementById("btn-clear");
let alertDialog = document.getElementById("alert");
let buttonCancel = document.getElementById("btn-cancel");
let buttonOke = document.getElementById("btn-oke");
const books_etalase_read = document.getElementById('book-read');
const books_etalase_unread = document.getElementById('book-unread');

formBooks.addEventListener('submit', function (event) {
    addBook();
    loadBooks();
    snackbar();
    formBooks.reset();
    event.preventDefault();
})

buttonClear.addEventListener('click', (e) => {
    // localStorage.removeItem(storage_key);
    alertDialog.classList.toggle("hidden");
    loadBooks();
})

buttonCancel.addEventListener('click', (e) => {
    alertDialog.classList.toggle("hidden");
})

buttonOke.addEventListener('click', (e) => {
    localStorage.removeItem(storage_key);
    alertDialog.classList.toggle("hidden");
    loadBooks();
    book_data = getBooks();
})


function getId(array) {
    return array == "" ? 1 : array[array.length - 1].id + 1;
}

function addBook() {
    let data = {
        id: getId(getBooks()),
        title: inputTitle.value,
        author: inputAuthor.value,
        year: inputYear.value,
        isComplete: inputIsRead.checked,
    };
    book_data.push(data);
    saveBooks(book_data);
}

function saveBooks(array) {
    let data_saved = JSON.stringify(array);
    localStorage.setItem(storage_key, data_saved);
}

function getBooks() {
    if (localStorage.getItem(storage_key) == null) return [];
    return Array.from(JSON.parse(localStorage.getItem(storage_key)));
}

function loadBooks() {
    let books = getBooks();
    books_etalase_read.innerHTML = '';
    books_etalase_unread.innerHTML = '';
    for (const book of books) {
        // jika buku sudah dibaca
        if (book.isComplete == false) {
            books_etalase_unread.innerHTML +=
                `<div class="flex flex-row items-center justify-between  border border-gray-300 rounded-lg hover:border-sky-500 hover:ring hover:ring-sky-200 transition duration-200" id="${book.id}">
                            <div class="flex flex-col px-4 py-2 text-gray-700">
                                <span class="text-lg font-semibold">${book.title}</span>
                                <div class="flex flex-row items-center gap-2 text-sm text-gray-500">
                                    <span class="text-sm text-gray-500">by ${book.author}</span>
                                    <span>-</span>
                                    <span>${book.year}</span>
                                </div>
                            </div>
                            <div class="flex flex-row items-center gap-3 pr-4">
                                <button class="p-2 text-gray-400 rounded-full hover:bg-gray-200" onClick="markBook(this)">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <button class="p-2 text-red-500 rounded-full hover:bg-gray-200 " onClick="removeBook(this)">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                </div>`;
        }
        if (book.isComplete == true) {
            books_etalase_read.innerHTML +=
                `<div class="flex flex-row items-center justify-between  border border-gray-300 rounded-lg hover:border-lime-500 hover:ring hover:ring-lime-200 transition duration-200" id="${book.id}">
            <div class="flex flex-col px-4 py-2 text-gray-700">
                <span class="text-lg font-semibold">${book.title}</span>
                <div class="flex flex-row items-center gap-2 text-sm text-gray-500">
                    <span class="text-sm text-gray-500">by ${book.author}</span>
                    <span>-</span>
                    <span>${book.year}</span>
                </div>
            </div>
            <div class="flex flex-row items-center gap-3 pr-4">
                <button class="p-2 text-green-500 rounded-full hover:bg-gray-200" onClick="markBook(this)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
                <button class="p-2 text-red-500 rounded-full hover:bg-gray-200" onClick="removeBook(this)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
                </div>`;
        }
    }
}

function removeBook(event) {
    let id = event.parentNode.parentNode.id;
    let books = getBooks();
    books.forEach(book => {
        if (book.id == id) {
            books.splice(books.indexOf(book), 1);
        }
    })
    saveBooks(books);
    loadBooks();
    book_data = getBooks();
}

function markBook(event) {
    let id = event.parentNode.parentNode.id;
    let books = getBooks();
    books.forEach(book => {
        if (book.id == id) {
            book.isComplete == true ? book.isComplete = false : book.isComplete = true;
        }
    })
    saveBooks(books);
    loadBooks();
    book_data = getBooks();
}

function snackbar() {
    let element = document.getElementById("snackbar");
    element.className = "show";
    setTimeout(function () {
        element.className = element.className.replace("show", "");
    }, 3000);
}

function filterData() {
    let input = document.getElementById('input-filter');
    let filter = input.value.toUpperCase();
    for (const data of getBooks()) {
        if (data.title.toUpperCase().indexOf(filter) > -1) {
            document.getElementById(data.id).style.display = "";
        } else {
            document.getElementById(data.id).style.display = "none";
        }
    }
}

function testFilter(text, array) {
    for (const data of array) {
        if (data.title.indexOf(text) > -1) {
            // console.log(array[array.indexOf(data)]);
            // console.log(document.getElementById(data.id));
        } else {
            document.getElementById(data.id).style.display = "none";
        }
    }
}