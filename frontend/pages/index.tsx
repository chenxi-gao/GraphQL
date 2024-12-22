import { gql, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook({ variables: { title, author } });
    setTitle('');
    setAuthor('');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('确定要删除这本书吗？')) {
      await deleteBook({ variables: { id } });
    }
  };

  if (loading) return <p>加载中...</p>;
  if (error) return <p>错误 :(</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">图书列表</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="书名"
            className="border p-2 mr-2"
          />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="作者"
            className="border p-2 mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            添加图书
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.books.map((book: any) => (
          <div key={book.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-gray-600">作者：{book.author}</p>
            <button
              onClick={() => handleDelete(book.id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              删除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 