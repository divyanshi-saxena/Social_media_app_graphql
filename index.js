const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const { MONGODB } = require("./config");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Mongodb connected");
    return server.listen({ port: PORT });
  })
  .then((res) => console.log(`Server running at ${res.url}`))
  .catch((err) => console.error(err));

// server
//   .listen({ port: 5000 })
//   .then((res) => console.log(`Server running at ${res.url}`));
