const mongoConnection = require("../mongoConnection");
const { ObjectId } = require("mongodb");
const itemCollection = mongoConnection.collection("items");

const getAllItems = async () => {
  const cursor = itemCollection.find();
  return await cursor.toArray().catch((error) => {
    throw new Error(error.message);
  });
};

const getItemsByObjId = async (listOfItemObjIds) => {
  const finalList = listOfItemObjIds.map((x) => ObjectId(x));
  const cursor = itemCollection.find({ _id: { $in: finalList } });
  return await cursor.toArray().catch((error) => {
    throw new Error(error.message);
  });
};

// TODO: Could be possible to be done with aggregation. Not sure which method is
// better
const getTotalPriceOfItems = async (listOfItemJsonObjs) => {
  var totalPrice = 0;
  listOfItemJsonObjs.forEach((itemObj) => {
    totalPrice = itemObj.price + totalPrice;
  });
  return await totalPrice;
};
module.exports = { getAllItems, getItemsByObjId, getTotalPriceOfItems };
