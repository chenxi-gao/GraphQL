import { v4 as uuidv4 } from 'uuid';
import { ApolloServer, gql } from 'apollo-server';

// Define GraphQL schema
const typeDefs = gql`
  # Book type definition with required fields
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  # Query type for retrieving books
  type Query {
    books: [Book]      # Get all books
    book(id: ID!): Book  # Get a specific book by ID
  }

  # Mutation type for modifying books
  type Mutation {
    addBook(title: String!, author: String!): Book    # Add a new book
    deleteBook(id: ID!): Book                         # Delete a book by ID
  }
`;

// Sample data
let books = [
  {
    id: uuidv4(),
    title: '1984',
    author: 'George Orwell'
  },
  {
    id: uuidv4(),
    title: 'One Hundred Years of Solitude',
    author: 'Gabriel García Márquez'
  }
];

// Resolvers implementation
const resolvers = {
  Query: {
    // Resolver for getting all books
    books: () => books,
    // Resolver for getting a specific book by ID
    book: (_, { id }) => books.find(book => book.id === id)
  },
  Mutation: {
    // Resolver for adding a new book
    addBook: (_, { title, author }) => {
      const book = {
        id: uuidv4(),
        title,
        author
      };
      books.push(book);
      return book;
    },
    // Resolver for deleting a book
    deleteBook: (_, { id }) => {
      const bookIndex = books.findIndex(book => book.id === id);
      if (bookIndex === -1) return null;
      const [deletedBook] = books.splice(bookIndex, 1);
      return deletedBook;
    }
  }
};

// Initialize Apollo Server with schema and resolvers
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
}); 