document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        });

    // Load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });

    // Add hover effect to books
    const books = document.querySelectorAll('.book');
    books.forEach(book => {
        book.addEventListener('mouseenter', () => {
            book.style.transform = 'translateY(-5px)';
        });
        book.addEventListener('mouseleave', () => {
            book.style.transform = 'translateY(0)';
        });
    });

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

