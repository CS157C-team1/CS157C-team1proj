const { ObjectId } = require("mongodb");
const mongoConnection = require("../mongoConnection");
const itemCollection = mongoConnection.collection("items");

const getAllItems = async () => {
  const cursor = itemCollection.find();
  return await cursor.toArray().catch((error) => {
    throw new Error(error.message);
  });
};

const sellItem = async (item) => {
  
}

const getItem = async (id) => {
  var o_id = new ObjectId(id)
  return await itemCollection.findOne({_id: o_id}).catch((error) => {
    throw new Error(error.message);
  });
};

module.exports = { getAllItems, getItem };