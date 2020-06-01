let apiResults = [];
const cardsContainer = document.getElementById("books-container");

function getBooksBySearch() {
  // create Template Screens
  createBookLoadingTemplates();
  
  // Get books through api
  getBooks();
}

function createBookLoadingTemplates() {
    let bookElems = "";

    for(let i=0; i<12; i++) {
        bookElems += `<div class="card">
            <div class="card-img"></div>
            <div class="card-body">
                <h5 class="book-title">........</h5>
                <p class="book-subtitle">by .....</p>
                <p class="card-text">-----------------------------------</p>
            </div>    
        </div>
    `;
    }

    cardsContainer.innerHTML = bookElems;
}

function getBooks() {
    let booksElem = "";
    const searchValue = document.getElementById("search-input").value;
    setTimeout(() => {
        fetchBooks(searchValue)
        .then(data => {
            apiResults = data.items.length > 0 ? data.items.slice(0, 12) : [];
            apiResults.forEach((item, index) => {
                booksElem += `<div class="card">
                    <img class="card-img" src="${
                        item["volumeInfo"].imageLinks ? item["volumeInfo"].imageLinks.thumbnail : ''
                    }" alt="Book image ">
                        <div class="card-body">
                        <h5 class="book-title">${item["volumeInfo"].title}</h5>
                        <p class="book-subtitle">by ${
                            item["volumeInfo"].authors
                            ? item["volumeInfo"].authors[0]
                            : "...."
                        }</p>
                        <p class="card-text">${item["searchInfo"] ? item["searchInfo"].textSnippet : 'No Description'}</p>
                        </div>    
                    </div>
                `;
            });
            cardsContainer.innerHTML = booksElem;
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }, 3000); // load data after 3 seconds
}

async function fetchBooks(searchValue) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&key=AIzaSyA9XgaunjWdp0NdC7kET-U1OqRIgQClnwo`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response.json();
}
