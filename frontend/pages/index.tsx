// Import necessary dependencies from Apollo Client and React
import { gql, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';

// GraphQL query to fetch all books
const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
    }
  }
`;

// GraphQL mutation to add a new book
const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

// GraphQL mutation to delete a book by ID
const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

export default function Home() {
  // Initialize Apollo hooks for querying and mutating data
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }], // Refresh book list after adding
  });
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }], // Refresh book list after deleting
  });

  // State management for form inputs
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  // Handle form submission to add a new book
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook({ variables: { title, author } });
    // Reset form fields after submission
    setTitle('');
    setAuthor('');
  };

  // Handle book deletion with confirmation
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await deleteBook({ variables: { id } });
    }
  };

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      
      {/* Book submission form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Book Title"
            className="border p-2 mr-2"
          />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            className="border p-2 mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Book
          </button>
        </div>
      </form>

      {/* Display grid of books */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.books.map((book: any) => (
          <div key={book.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-gray-600">Author: {book.author}</p>
            <button
              onClick={() => handleDelete(book.id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 