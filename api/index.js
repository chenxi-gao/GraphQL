const { ApolloServer, gql } = require('apollo-server');

// 用于生成唯一ID的计数器
let idCounter = 0;

// 生成下一个ID
const getNextId = () => {
  idCounter += 1;
  return String(idCounter);
};

// 定义GraphQL schema
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

// 模拟数据
let books = [
  {
    id: getNextId(),
    title: '三体',
    author: '刘慈欣'
  },
  {
    id: getNextId(),
    title: '活着',
    author: '余华'
  }
];

// 解析器
const resolvers = {
  Query: {
    books: () => books,
    book: (_, { id }) => books.find(book => book.id === id)
  },
  Mutation: {
    addBook: (_, { title, author }) => {
      const book = {
        id: getNextId(),
        title,
        author
      };
      books.push(book);
      return book;
    },
    deleteBook: (_, { id }) => {
      const bookIndex = books.findIndex(book => book.id === id);
      if (bookIndex === -1) return null;
      const [deletedBook] = books.splice(bookIndex, 1);
      return deletedBook;
    }
  }
};

// 创建Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
}); 