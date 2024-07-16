const path = require("path");
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = requrie("@apollo/server/express4");

const { typeDefs, resolvers } = require("./schemas");
const PORT = process.env.PORT || 3001;
const db = require("./config");
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const app = express();

const startApollo = async () => {
  await server.start();
  app.use(express.urlencoded({ extended: true }));
  app.use(exoress.json());
  app.use("/graphql", expressMiddleware(server, { context: authMiddleware }));
};
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}
db.once("open", () => {
  console.log("running on", PORT);
});
