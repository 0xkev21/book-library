const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.changeStatus = function() {
    this.read = this.read ? false : true;
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

    const isRead = document.createElement('p');
    isRead.classList.add('read-status');
    isRead.textContent = myLibrary[index].read ? 'Read' : 'Not Read';

    const readIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    readIcon.classList.add('read-status-icon');
    readIcon.setAttribute('viewBox', '0 0 38 38');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    readIcon.appendChild(path);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('removeBtn');
    deleteBtn.textContent = 'Remove';

    deleteBtn.addEventListener('click',(e) => {
        const cardToRemove = e.target.parentNode.parentNode;
        cardToRemove.remove();

        const indexToRemove = cardToRemove.getAttribute('data-number');
        myLibrary.splice(indexToRemove, 1);
        updateNumbers();
    });

    const changeStatusBtn = document.createElement('button');
    changeStatusBtn.classList.add('changeBtn');
    changeStatusBtn.textContent = 'Status';
    changeStatusBtn.addEventListener('click', (e) => {
        const cardToChange = e.target.parentNode.parentNode;
        const indexToChange = cardToChange.getAttribute('data-number');

        myLibrary[indexToChange].changeStatus();
        cardToChange.setAttribute('data-read', myLibrary[indexToChange].read);
        const textToChange = cardToChange.querySelector('.read-status');
        textToChange.textContent = myLibrary[indexToChange].read ? 'Read' : 'Not Read';
    })

    const bookButtons = document.createElement('div');
    bookButtons.classList.add('book-buttons');
    bookButtons.appendChild(deleteBtn);
    bookButtons.appendChild(changeStatusBtn);

    const bookDetails = document.createElement('div');
    bookDetails.classList.add('book-details');

    bookDetails.appendChild(bookTitle);
    bookDetails.appendChild(bookAuthor);
    bookDetails.appendChild(bookPages);
    
    card.appendChild(bookDetails);
    card.setAttribute('data-read', book.read);
    card.appendChild(isRead);
    card.appendChild(bookButtons);
    card.appendChild(readIcon);

    container.appendChild(fragment);
}

function updateNumbers() {
    const books = document.querySelectorAll('.card');
    books.forEach((book, index) => {
        book.setAttribute('data-number', index);
    })
};

const newBookForm = document.querySelector('.newBookForm');

const newBookButton = document.querySelector('.newBook');
newBookButton.addEventListener('click', () => {
    newBookForm.reset();
    newBookForm.classList.toggle('active');
    newBookButton.classList.toggle('active');
});

const addBookButton = document.querySelector('.addBtn');
addBookButton.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').value === 'on' ? true : false;

    if(newBookForm.checkValidity()) {
        addBook(title, author, pages, read);
        newBookForm.classList.toggle('active');
        newBookButton.classList.toggle('active');
    } else {
        newBookForm.reportValidity();
    }
});

const darkButton = document.querySelector('.mode');
darkButton.addEventListener('click', (e) => {
    document.body.classList.toggle('dark');
    darkButton.classList.toggle('dark');
})

addBook('Wuthering Heights', 'Emily Brontë', 400, false);