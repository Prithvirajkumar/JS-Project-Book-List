class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book){
        const list = document.getElementById('book-list');
        // create row element 
        const row = document.createElement('tr');
        // insert collumns 
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href = "#" class = "delete">x<a></td>
        `;
        list.appendChild(row);
    }

    showAlert(message, className){
    // create div 
    const div = document.createElement('div');
    // add class name 
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent 
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // inserting the alert
    container.insertBefore(div, form);
    // timeout after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Local Storage
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI;

            // add the book using the class to the UI
            ui.addBookToList(book);
        });
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function(book, index){
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// DOM load Evenr 
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event listeners 
document.getElementById('book-form').addEventListener('submit', function(e){
    // get values from the form
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // Instantiate Book constructor
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // validation
    if(title === '' || author === '' || isbn === ''){
        // error calls
        ui.showAlert('Please enter all fields', 'error');
    } else {
    // add book to list 
    ui.addBookToList(book);

    // pass to LS - no need to intantiate as add book is static
    Store.addBook(book);

    // success alert
    ui.showAlert('Book added', 'success');

    // clear fields 
    ui.clearFields();
    }

    e.preventDefault();
});

// Event Listener for delete 
document.getElementById('book-list').addEventListener('click', function(e){
    // Instantiate UI
    const ui = new UI();

    // delete book
    ui.deleteBook(e.target);

    // remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // showmessgae 
    ui.showAlert('Book Removed', 'success');

    e.preventDefault();
})