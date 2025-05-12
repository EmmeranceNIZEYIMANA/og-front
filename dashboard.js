import React, { useState, useEffect } from 'react';
import Image from './assets/nn.jpg';

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [bookname, setBookname] = useState('');
  const [bookage, setBookage] = useState('');
  const [booklanguage, setBooklanguage] = useState('');

  const token = localStorage.getItem('token');

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/selectbook', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Failed to fetch books', error);
    }
  };

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
    } else {
      fetchBooks();
    }
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/insertbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookname, bookage, booklanguage }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Book added successfully!');
        setBookname('');
        setBookage('');
        setBooklanguage('');
        fetchBooks();
      } else {
        alert(data.error || 'Failed to add book');
      }
    } catch (error) {
      alert('Error occurred while adding book');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover"
      style={{ backgroundImage: `url(${Image})` }}
    >
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-600">Dashboard</h2>

        <form onSubmit={handleAddBook} className="max-w-md mx-auto bg-white shadow p-6 rounded mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Add New Book</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Book Name"
              value={bookname}
              onChange={(e) => setBookname(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Book Age"
              value={bookage}
              onChange={(e) => setBookage(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Book Language"
              value={booklanguage}
              onChange={(e) => setBooklanguage(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
          >
            Add Book
          </button>
        </form>

        <div>
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Books List</h3>
          <ul>
            {books.map((book) => (
              <li key={book.bookid} className="border p-3 rounded mb-2">
                <strong>{book.bookname}</strong> - {book.booklanguage} (Age: {book.bookage})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
