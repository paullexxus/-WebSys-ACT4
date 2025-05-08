const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');
let books = [];

// Fetch data from GitHub JSON file
fetch('https://paullexxus.github.io/BOOKS/data.json')
  .then(response => response.json())
  .then(data => {
    books = data;
    renderBooks('');
  })
  .catch(error => {
    resultsDiv.innerHTML = "<p>Error loading book data.</p>";
    console.error('Fetch error:', error);
  });

// Search event
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  renderBooks(query);
});

// Function to render books
function renderBooks(query) {
  resultsDiv.innerHTML = '';
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(query)
  );

  if (filteredBooks.length === 0) {
    resultsDiv.innerHTML = "<p>No books found.</p>";
    return;
  }

  filteredBooks.forEach(book => {
    const bookDiv = document.createElement('div');
    bookDiv.className = `book ${book.status === "Available" ? "available" : "checked-out"}`;
    bookDiv.innerHTML = `
      <p><strong>Title:</strong> ${book.title}</p>
      <p><strong>Author:</strong> ${book.author}</p>
      <p class="status ${book.status === "Available" ? "available" : "checked-out"}">${book.status}</p>
    `;
    resultsDiv.appendChild(bookDiv);
  });
}
