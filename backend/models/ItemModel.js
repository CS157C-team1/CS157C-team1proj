const mongoConnection = require("../mongoConnection");
const {ObjectId} = require('mongodb');
const itemCollection = mongoConnection.collection("items");

const getAllItems = async () => {
  const cursor = itemCollection.find();
  return await cursor.toArray().catch((error) => {
    throw new Error(error.message);
  });
};

const sellItem = async (item) => {
  
}
module.exports = { getAllItems };