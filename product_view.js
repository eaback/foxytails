//API-anrop för att visa info för product_view
async function searchByBookId(bookId) {
    try {
        const response = await fetch(`https://ebooks-virid.vercel.app/products?_id=${bookId}`);
        if (!response.ok) {
            throw new Error("HTTP error code: " + response.status);
        }

        let data = await response.json();
        if (data.length > 0) {
            let bookData = data[0];
            let currentName = bookData.name;
            let currentCategories = bookData.categories[0];
            let currentStock = bookData.stock;
            let currentPrice = bookData.price.$numberDecimal;

            displayBookInfo(currentName, currentCategories, currentStock, currentPrice);
        } else {
            console.error("No book found with the given ID");
        }
    } catch (error) {
        console.error("Error fetching book data:", error);
    }
}

//display info
function displayBookInfo(name, categories, stock, price) {
    document.getElementById("booktitle-placeholder").innerHTML = name;
    document.getElementById("category-placeholder").innerHTML = `Category: ${categories}`;
    document.getElementById("stock-placeholder").innerHTML = `In stock: ${stock}`;
    document.getElementById("price-placeholder").innerHTML = `$${price}`;
}