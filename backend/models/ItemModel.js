const { ObjectId } = require("mongodb");
const mongoConnection = require("../mongoConnection");
const itemCollection = mongoConnection.collection("items");
const userModel = require("../models/UserModel");

const getAllItems = async () => {
  const cursor = itemCollection.find();
  return await cursor.toArray().catch((error) => {
    throw new Error(error.message);
  });
};

const getAllItemIds = async () => {

  var ObjectId = require('mongodb').ObjectId; 
  var id = req.params.gonderi_id;       
  var o_id = new ObjectId(id);
  const cursor = itemCollection.find({_id:o_id});
  return await cursor.toArray().catch((error) => {
    throw new Error(error.message);
  });

}
const getItem = async (id) => {
  var o_id = new ObjectId(id);
  return await itemCollection.findOne({ _id: o_id }).catch((error) => {
    throw new Error(error.message);
  });
};

const searchItems = async (query, type, listItemIds) => {

  // Check ff listItemIds does not exist
  if (listItemIds === null || listItemIds === undefined) {
    return await [];
  }
  // Take the obj id string in list and turn them to actual Objects
  const finalList = listItemIds.map((x) => ObjectId(x));

  if (query === "{\"current\":\"Any\"}") {
    query = "{\"current\":null}"
  }

  if (query === "{\"current\":null}" && type === "{\"current\":null}") {
    console.log("Both null")
    return await itemCollection.find({ _id: { $in: finalList } }).toArray().catch((error) => {
      throw new Error(error.message);
    });
  }
  if (query === "{\"current\":null}") {
    console.log("query null")
    return await itemCollection.find({ _id: { $in: finalList }, type: type }).toArray().catch((error) => {
      throw new Error(error.message);
    });
  }
  if (type === "{\"current\":null}") {
    console.log("type null")
    return await itemCollection.find({ _id: { $in: finalList }, name: { $regex: query, $options: "$i" } }).toArray().catch((error) => {
      throw new Error(error.message);
    });
  }
  return await itemCollection.find({ _id: { $in: finalList }, name: { $regex: query, $options: "$i" }, type: type }).toArray().catch((error) => {
    console.log("non null")
    throw new Error(error.message);
  });
}

const getItemsByObjId = async (listOfItemObjIds) => {
  if (listOfItemObjIds === null || listOfItemObjIds === undefined) {
    return await [];
  }
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

const getItemsForDisplay = async (listOfPostedItems) => {
  // Get Items that are posted by given userId
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
    totalPrice = parseInt(itemObj.price) + totalPrice;
  });
  return await totalPrice;
};

const addItem = async (itemInfo) => {
  return await itemCollection.insertOne(itemInfo).catch((error) => {
    throw new Error("Item could not be added: " + error.message);
  });
}

const itemsBought = async (listOfItemIds) => {
  const finalList = listOfItemIds.map((x) => ObjectId(x));
  const filter = { _id: { $in: finalList } }
  const update = { $set: { sold: true } }
  itemCollection.updateMany(filter, update)
}
module.exports = {
  getAllItems,
  getItemsByObjId,
  getTotalPriceOfItems,
  getItemsNotIn,
  getItem,
  searchItems,
  getItemsForDisplay,
  addItem,
  itemsBought
};
