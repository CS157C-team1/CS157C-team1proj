const { ObjectId } = require("mongodb");
const mongoConnection = require("../mongoConnection");
const itemCollection = mongoConnection.collection("items");
const userCollection = require("../models/UserModel");

const getAllItems = async () => {
  const cursor = itemCollection.find();
  return await cursor.toArray().catch((error) => {
    throw new Error(error.message);
  });
};

const getItem = async (id) => {
  var o_id = new ObjectId(id);
  return await itemCollection.findOne({ _id: o_id }).catch((error) => {
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

// Get All Item Information Not int the Given list of item obj ids
// Does not work if given list is empty
const getItemsNotIn = async (listOfItemObjIds) => {
  const finalList = listOfItemObjIds.map((x) => ObjectId(x));
  const cursor = itemCollection.find({ _id: { $nin: finalList } });
  return await cursor.toArray().catch((error) => {
    throw new Error(error.message);
  });
};

const getItemsForDisplay = async (userId) => {
  // Get Items that are posted by given userId
  const userInfo = await userCollection.getUserByObjectId(userId);
  const listOfPostedItems = userInfo.items_post;
  if (listOfPostedItems === null || listOfPostedItems === undefined) {
    return await getAllItems();
  } else {
    return await getItemsNotIn(listOfPostedItems);
  }
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

module.exports = {
  getAllItems,
  getItemsByObjId,
  getTotalPriceOfItems,
  getItemsNotIn,
  getItem,
  getItemsForDisplay,
};
