const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBook(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBook(newBook, myLibrary.length - 1);
}

const container = document.querySelector('.container');

function displayBook(book, index) {
    const fragment = document.createDocumentFragment();
    const card = document.createElement('div');
    fragment.appendChild(card);
    card.classList.add('card');

    const bookTitle = document.createElement('p');
    bookTitle.classList.add('bookTitle');
    bookTitle.textContent = `"${book.title}"`;

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('bookAuthor');
    bookAuthor.textContent = book.author;

    const bookPages = document.createElement('p');
    bookPages.classList.add('bookPages');
    bookPages.textContent = `${book.pages} pages`;
    
    card.setAttribute('data-number', index);

    const button = document.createElement('button');
    button.classList.add('removeBtn');
    button.addEventListener('click',(e) => {
        const cardToRemove = e.target.parentNode;
        cardToRemove.remove();

        console.log(card.getAttribute('data-number'));
        const indexToRemove = cardToRemove.getAttribute('data-number');
        myLibrary.splice(card.getAttribute('data-number'), 1);
        updateNumbers();
        console.log(myLibrary);
    });

    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    card.setAttribute('data-read', book.read);
    card.appendChild(button);

    container.appendChild(fragment);
}

function updateNumbers() {
    const books = document.querySelectorAll('.card');
    books.forEach((book, index) => {
        book.setAttribute('data-number', index);
    })
};

addBook('Wuthering Heights', 'Emily Brontë', 400, false);
addBook('Blah blah', 'Kev', 21, true);
addBook('Blah blah 2', 'Kev',400, true);

const newBookButton = document.querySelector('.newBook');
newBookButton.addEventListener('click', () => {
    document.querySelector('.newBookForm').classList.toggle('active');
});

const addBookButton = document.querySelector('.addBtn');
addBookButton.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').value === 'on' ? true : false;
    addBook(title, author, pages, read);
});