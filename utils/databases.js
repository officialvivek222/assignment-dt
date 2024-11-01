const MongoClient = require("mongodb").MongoClient;

let client;
let db;

const connect = async () => {
  try {
    const config = require("../config/config");
    client = await MongoClient.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = client.db();
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

const getCollection = (collectionName) => {
  return db.collection(collectionName);
};

const findOne = async (collectionName, filter) => {
  const collection = getCollection(collectionName);
  return await collection.findOne(filter);
};

const find = async (collectionName, filter, options = {}) => {
  const collection = getCollection(collectionName);
  return await collection.find(filter, options).toArray();
};

const insertOne = async (collectionName, document) => {
  const collection = getCollection(collectionName);
  const result = await collection.insertOne(document);
  return result.insertedId;
};

const updateOne = async (collectionName, filter, update) => {
  const collection = getCollection(collectionName);
  await collection.updateOne(filter, update);
};

const deleteOne = async (collectionName, filter) => {
  const collection = getCollection(collectionName);
  await collection.deleteOne(filter);
};

module.exports = {
  connect,
  findOne,
  find,
  insertOne,
  updateOne,
  deleteOne,
};
