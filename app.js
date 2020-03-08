// Book Constructor 
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor 
function UI() {}
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    // create row element 
    const row = document.createElement('tr');
    // insert collumns 
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href = "#" class = "delete">X<a></td>
    `;
    list.appendChild(row);
}

// showAlert funtion 
UI.prototype.showAlert = function(message, className){
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

// delete book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

// clear fields function
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

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

    // showmessgae 
    ui.showAlert('Book Removed', 'success');

    e.preventDefault();
})