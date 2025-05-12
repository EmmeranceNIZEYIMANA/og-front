import { useState, useEffect } from "react";

function App() {
  const [bookname, setBookname] = useState("");
  const [booklanguage, setBooklanguage] = useState("");
  const [bookage, setBookage] = useState("");
  const [books, setBooks] = useState([]);

  // Function to fetch books from the backend
  const fetchBooks = async () => {
    const response = await fetch("http://localhost:5000/books");
    const data = await response.json();
    setBooks(data);
  };

  // Function to handle form submission (Adding a book)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookname, bookage, Booklanguage }),
    });

    if (response.ok) {
      fetchBooks(); // Refresh books list after adding a new book
    } else {
      console.log("Error adding book");
    }

    setBookname("");
    setBooklanguage("");
    setBookage("");
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-400">Library Management</h1>

      {/* Form to add a book */}
      <div className="mt-6">
        <h2 className="text-xl text-gray-400">Add a Book</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            id="bookname"
            placeholder="Book Name"
            value={bookname}
            onChange={(e) => setBookname(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
            required
          />
          <input
            type="text"
            id="booklanguage"
            placeholder="Book language"
            value={bookname}
            onChange={(e) => setBooklanguage(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
            required
          />
          <input
            type="text"
            id="bookage"
            placeholder="Book Age"
            value={bookage}
            onChange={(e) => setBookage(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full mb-4"
            required
          />
          <button
            type="submit"
            className="bg-gray-400 text-white py-2 px-4 rounded-md w-full"
          >
            Add Book
          </button>
        </form>
      </div>

      {/* Display books */}
      <div className="mt-6">
        <h2 className="text-xl text-gray-400">Books List</h2>
        <ul className="mt-4">
          {books.map((book) => (
            <li key={book.bookid} className="border p-2 mb-2 rounded-md bg-gray-100">
              {book.bookname},{book.booklanguage} - Age: {book.bookage}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
