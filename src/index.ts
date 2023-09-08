import {buildSubgraphSchema} from "@apollo/subgraph";
import {ApolloServer, ContextFunction} from "@apollo/server";
import {
  startStandaloneServer,
} from "@apollo/server/standalone";

const port = process.env.PORT ?? "8080";
const subgraphName = require("../package.json").name;
import {roomModule} from "./schema";
import {RoomAPI} from "./datasources/room";
const mongoose = require("mongoose");



async function main() {

  mongoose.connect(`mongodb+srv://varshant:${process.env.MONGO_CONF_PASSWORD}@cluster0.rcdu4.mongodb.net/conf-ai`);
  var db = mongoose.connection;
  db.on("error", function () {console.log('Mongo error');});
  db.on('connected', function () {console.log('MongoDB Connected');});
  db.on('disconnected', function () {console.log('MongoDB Disconnected');});

  // If the Node process ends, close the Mongoose connection 
  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

  const server = new ApolloServer({
    schema: buildSubgraphSchema([roomModule]),
  });
  const {url} = await startStandaloneServer(server, {
    context: async () => ({dataSources: {roomAPI: new RoomAPI()}}),
    listen: {port: Number.parseInt(port)},
  });

  console.log(`🚀  Subgraph ${subgraphName} ready at ${url}`);
  console.log(`Run 'rover dev --url ${url} --name ${subgraphName}`);
}

main();
