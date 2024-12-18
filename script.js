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

        let categories = new Set(); // Store unique categories
        let checkedCategories = new Set(); // Store checked categories

        // Fetch books from API and populate the grid
        fetchBooks();
    
        // Add event listener for search and category filters
        const searchInput = document.getElementById('search-books');
        const searchButton = document.getElementById('search-button');
    
        if (searchInput && searchButton) {
            searchInput.addEventListener('input', debounce(handleFilters, 300));
            searchButton.addEventListener('click', handleFilters);
        }
    
        function fetchBooks(name = '', selectedCategories = []) {
            const queryParams = new URLSearchParams();
            if (name) queryParams.append('name', name);
            if (selectedCategories.length > 0) queryParams.append('categories', selectedCategories.join(','));
    
            fetch(`https://ebooks-virid.vercel.app/products?${queryParams}`)
                .then(response => response.json())
                .then(data => {
                    const booksGrid = document.getElementById('books-grid');
                    if (booksGrid) {
                        booksGrid.innerHTML = ''; // Clear existing content
                        if (data.length === 0) {
                            booksGrid.innerHTML = '<p>No books found matching your criteria.</p>';
                        } else {
                            data.forEach(book => {
                                const bookElement = createBookElement(book);
                                booksGrid.appendChild(bookElement);
                                // Collect unique categories
                                book.categories.forEach(category => categories.add(category));
                            });
                        }
                        if (categories.size === 0) {
                            fetchAllCategories();
                        } else {
                            populateCategoryFilters();
                        }
                    }
                })
                .catch(error => console.error('Error fetching books:', error));
        }
    
        function fetchAllCategories() {
            fetch('https://ebooks-virid.vercel.app/products')
                .then(response => response.json())
                .then(data => {
                    data.forEach(book => {
                        book.categories.forEach(category => categories.add(category));
                    });
                    populateCategoryFilters();
                })
                .catch(error => console.error('Error fetching categories:', error));
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
    
        function populateCategoryFilters() {
            const categoryFilterSection = document.getElementById('category-filters');
            if (categoryFilterSection) {
                categoryFilterSection.innerHTML = '<h3>Filter by Category</h3>';
                
                [...categories].sort().forEach((category, index) => {
                    const label = document.createElement('label');
                    label.className = index % 2 === 0 ? 'dark-orange' : 'light-orange';
                    const isChecked = checkedCategories.has(category) ? 'checked' : '';
                    label.innerHTML = `
                        <input type="checkbox" value="${category}" class="category-checkbox" ${isChecked}> ${category}
                    `;
                    categoryFilterSection.appendChild(label);
                });
    
                // Add event listeners to category checkboxes
                document.querySelectorAll('.category-checkbox').forEach(checkbox => {
                    checkbox.addEventListener('change', function() {
                        if (this.checked) {
                            checkedCategories.add(this.value);
                        } else {
                            checkedCategories.delete(this.value);
                        }
                        handleFilters();
                    });
                });
            }
        }
    
        function handleFilters() {
            const searchInput = document.getElementById('search-books');
            const searchTerm = searchInput ? searchInput.value : '';
            const selectedCategories = Array.from(checkedCategories);
    
            fetchBooks(searchTerm, selectedCategories);
        }
    
        function debounce(func, delay) {
            let debounceTimer;
            return function() {
                const context = this;
                const args = arguments;
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => func.apply(context, args), delay);
            }
        }
    
       // Add hover effect to books
    const booksGrid = document.getElementById('books-grid');
    if (booksGrid) {
        booksGrid.addEventListener('mouseenter', function(e) {
            if (e.target.classList.contains('book')) {
                e.target.style.transform = 'translateY(-5px)';
            }
        }, true);

        booksGrid.addEventListener('mouseleave', function(e) {
            if (e.target.classList.contains('book')) {
                e.target.style.transform = 'translateY(0)';
            }
        }, true);
    }
    
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