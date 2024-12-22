import { ApolloServer, gql } from 'apollo-server';
import Book from './models/book.js';

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
    deleteBook(id: ID!): Book
  }
`;

const resolvers = {
  Query: {
    books: async () => await Book.findAll(),
    book: async (_, { id }) => await Book.findByPk(id)
  },
  Mutation: {
    addBook: async (_, { title, author }) => {
      return await Book.create({ title, author });
    },
    deleteBook: async (_, { id }) => {
      const book = await Book.findByPk(id);
      if (!book) return null;
      await book.destroy();
      return book;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
}); 