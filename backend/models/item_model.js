const mongoConnection = require("../mongoConnection");
const itemCollection = mongoConnection.collection("items");

const getAllItems = async () => {
  const cursor = itemCollection.find();
  return await cursor.toArray().catch((error) => {
    throw new Error(error.message);
  });
};

module.exports = { getAllItems };