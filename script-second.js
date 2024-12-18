const bookDiv = document.getElementById('books-container');

bookDiv.innerHTML = '';

async function fetchBookData() {
 
    try {
        const response = await fetch(`https://ebooks-virid.vercel.app/products`);
        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error code: ${response.status}, HTTP error message: ${response.statusText}`);
        }
        
        const data = await response.json();
        getBookContent(data)
        
    } catch (error) {
        bookDiv.innerHTML = `Sorry, we encountered an error: ${error.message}`;
    }
}

function getBookContent(data) {
    if (data && Array.isArray(data)) { // Check if data is an array
        bookDiv.innerHTML = ''; // Clear the container
        
        // Slice the first 4 books from the data array
        const firstFourBooks = data.slice(0, 4); 

        firstFourBooks.forEach((book) => { // Loop through the first four books
            bookDiv.innerHTML += `
            <a href="/product_view.html" class="book-link">
            <div class="book">
                <img src="${book.coverImage || 'img/book-cover-placeholder.png'}" alt="Book Cover">
                <h3>${book.name || 'Unknown Title'}</h3>
            </div>
            </a>`;
        });
    } else {
        bookDiv.innerHTML = 'No books found, try another search.';
    }
}

fetchBookData();