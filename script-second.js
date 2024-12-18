const bookDiv = document.getElementById('books-container');
const main = document.querySelector('main');

async function fetchBookData() {
    try {
        const response = await fetch(`https://ebooks-virid.vercel.app/products`);
        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error code: ${response.status}, HTTP error message: ${response.statusText}`);
        }
        
        const data = await response.json();
        getBookContent(data);
        
    } catch (error) {
        bookDiv.innerHTML = `Sorry, we encountered an error: ${error.message}`;
    }
}

function getBookContent(data) {
    if (data) {
        bookDiv.innerHTML = ''; // Clear the container
        
        // Slice the first 4 books from the data array
        const firstFourBooks = data.slice(0, 4); 
        
        firstFourBooks.forEach((book) => { // Loop through the first four books
            bookDiv.innerHTML += ` 
            <div class="book" onclick="fetchSingleBookData('${book._id}')">
            <img src="img/book-cover-placeholder.png" alt="Book Cover">
            <h4>${book.name}</h4>
            </div>
            `;
        });
    } else {
        bookDiv.innerHTML = 'No books found, try another search.';
    }
}

async function fetchSingleBookData(bookId) {
    try {
        const response = await fetch(`https://ebooks-virid.vercel.app/products?_id=${bookId}`);
        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error code: ${response.status}, HTTP error message: ${response.statusText}`);
        }
        
        const data = await response.json();
        singleBookContent(data[0]);
        
    } catch (error) {
        bookDiv.innerHTML = `Sorry, we encountered an error: ${error.message}`;
    }
}

function singleBookContent(data) {
    main.innerHTML = '';
    if (data) {
        main.innerHTML +=`
        <section class="book-section">
            <div class="book-content">
                <img src="${data.coverImage || 'img/book-cover-placeholder.png'}" alt="Book cover" id="book-cover">
                <div class="book-info-container">
                    <div class="info-container">
                        <h2 id="booktitle-placeholder">${data.name}</h2>
                        <p id="category-placeholder">Categories:${data.categories}</p>
                        <p id="stock-placeholder">Stock:${data.stock}</p>
                        <p id="price-placeholder">Price:$${data.price.$numberDecimal}</p>
                    </div>
                    <div class="buy-container">
                        <label>Quantity</label>
                        <input type="number" id="quantity" max="50" min="1">
                        <button type="button" class="button2">Add to cart <img src="img/cart-icon-contrast.png" alt="Add to cart"></button>
                    </div>
                    <div>
                        <p id="description-placeholder">Description: <br>${data.description}</p>
                    </div>
                </div>
            </div>
        </section>`;
    }
}

fetchBookData();