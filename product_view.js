document.addEventListener('DOMContentLoaded', function () {
    // Hämta ID:t från URL:en
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id'); // Hämta ID:t från ?id=12345

    if (bookId) {
        // Hämta och visa bokdata
        searchByBookId(bookId);
    } else {
        console.error("No book ID found in URL");
        document.getElementById("booktitle-placeholder").innerHTML = "No book found.";
    }
});

// Funktion för att hämta bokdata från API
async function searchByBookId(bookId) {
    try {
        const response = await fetch(`https://ebooks-virid.vercel.app/products?_id=${bookId}`);
        if (!response.ok) {
            throw new Error("HTTP error code: " + response.status);
        }

        const data = await response.json();
        if (data.length > 0) {
            const bookData = data[0];
            displayBookInfo(bookData.name, bookData.categories[0], bookData.stock, bookData.price.$numberDecimal);
        } else {
            console.error("No book found with the given ID");
            document.getElementById("booktitle-placeholder").innerHTML = "No book found.";
        }
    } catch (error) {
        console.error("Error fetching book data:", error);
        document.getElementById("booktitle-placeholder").innerHTML = "An error occurred.";
    }
}

// Funktion för att visa bokinformationen på sidan
function displayBookInfo(name, categories, stock, price) {
    document.getElementById("booktitle-placeholder").innerHTML = name;
    document.getElementById("category-placeholder").innerHTML = `Category: ${categories}`;
    document.getElementById("stock-placeholder").innerHTML = `In stock: ${stock}`;
    document.getElementById("price-placeholder").innerHTML = `$${price}`;
}
