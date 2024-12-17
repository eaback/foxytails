document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;

            const checkbtn = document.getElementById('checkbtn');
            const navMobile = document.querySelector('.nav-mobile');

            checkbtn.addEventListener('click', function() {
                navMobile.classList.toggle('active');
            })
        });

    // Load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });

    // Fetch books from API and populate the grid
    fetchBooks();

    // Add event listener for search
    const searchInput = document.getElementById('search-books');
    const searchButton = document.getElementById('search-button');

    searchInput.addEventListener('input', debounce(handleSearch, 300));
    searchButton.addEventListener('click', handleSearch);

    function fetchBooks() {
        fetch('https://ebooks-virid.vercel.app/products')
            .then(response => response.json())
            .then(data => {
                const booksGrid = document.getElementById('books-grid');
                booksGrid.innerHTML = ''; // Clear existing content
                data.forEach(book => {
                    const bookElement = createBookElement(book);
                    booksGrid.appendChild(bookElement);
                });
            })
            .catch(error => console.error('Error fetching books:', error));
    }

    function createBookElement(book) {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.innerHTML = `
            <a href="/product_view.html?id=${book._id}">
                <img src="${book.image}" alt="${book.name}">
                <h3 class="book-title">${book.name}</h3>
            </a>
            <div class="book-info">
                <span class="price">$${parseFloat(book.price.$numberDecimal).toFixed(2)}</span>
                <button type="button" class="cart-button button2">
                    <img src="/img/cart-icon.png" alt="Add to cart">
                </button>
            </div>
        `;
        return bookDiv;
    }

    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const books = document.querySelectorAll('.book');

        books.forEach(book => {
            const title = book.querySelector('.book-title').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                book.style.display = 'flex';
            } else {
                book.style.display = 'none';
            }
        });
    }

    // Debounce function to limit how often a function can fire
    function debounce(func, delay) {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        }
    }

    // Add hover effect to books (this will now work for dynamically added books)
    document.getElementById('books-grid').addEventListener('mouseenter', function(e) {
        if (e.target.classList.contains('book')) {
            e.target.style.transform = 'translateY(-5px)';
        }
    }, true);

    document.getElementById('books-grid').addEventListener('mouseleave', function(e) {
        if (e.target.classList.contains('book')) {
            e.target.style.transform = 'translateY(0)';
        }
    }, true);
    // Smooth scroll for navigation links
    document.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});