import React, { useState, useEffect } from 'react';

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found, please login again.');
      setLoading(false);
      return;
    }

    fetch('http://localhost:5000/books', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch books');
        }
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching books. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading books...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (books.length === 0) {
    return <div>No books available</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Books List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.bookid} className="border p-2 mb-2 rounded">
            <strong>{book.bookname}</strong> - {book.booklanguage} (Age: {book.bookage})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
