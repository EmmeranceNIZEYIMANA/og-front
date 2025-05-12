import { useEffect, useState } from 'react';
import axios from 'axios';

function BookList({ refreshTrigger }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/selectbook')
      .then((response) => setBooks(response.data))
      .catch((error) => console.error('Failed to fetch books:', error));
  }, [refreshTrigger]); // refresh when trigger changes

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Books List</h2>
      <ul className="space-y-2">
        {books.map((book) => (
          <li key={book.bookid} className="border p-2 rounded shadow">
            <strong>{book.bookname}</strong><strong>{book.booklanguage}</strong> - {book.bookage} years
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
