import React, { useState } from "react";

function BookForm({ onBookAdded }) {
  const [bookname, setBookname] = useState("");
  const [bookage, setBookage] = useState("");
  const [booklanguage, setBooklanguage] = useState("");


  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send data to backend (Express)
    const response = await fetch("http://localhost:5000/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookname, bookage, booklanguage }),
    });

    if (response.ok) {
      // Call the onBookAdded prop to refresh the books list after adding a new book
      onBookAdded();
    } else {
      console.error("Failed to add book");
    }

    // Reset form fields
    
    setBookname("");
    setBookname("");
    setBooklanguage("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-center text-gray-600 mb-4">
        Add a New Book
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Book Name Field */}
        <input
          type="text"
          placeholder="Book Name"
          value={bookname}
          onChange={(e) => setBookname(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          required
        />
         <input
          type="text"
          placeholder="Book language"
          value={bookname}
          onChange={(e) => setBooklanguage(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          required
        />

        {/* Book Age Field */}
        <input
          type="text"
          placeholder="Book Age"
          value={bookage}
          onChange={(e) => setBookage(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default BookForm;
