const mongoConnection = require("../mongoConnection");
const { ObjectId } = require("mongodb");
const userCollection = mongoConnection.collection("users");

const getAllUsersCol = async () => {
  const cursor = userCollection.find();
  await cursor
    .toArray()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const insertUserCol = async (user) => {
  await userCollection.insertOne(user).catch((error) => {
    throw new Error("User could not be added: " + error.message);
  });
};

const editUserInfo = async (userId, newUserInfo) => {
  console.log(newUserInfo)
  const filter = { _id: ObjectId(userId) };
  const updateDoc = { $set: newUserInfo };
  console.log(updateDoc)
  await userCollection.updateOne(filter, updateDoc)
}
const getUserByEmailCol = async (email) => {
  return await userCollection.findOne({ email }).catch((error) => {
    throw new Error(error.message);
  });
};

const getUserByObjectId = async (userId) => {
  return await userCollection
    .findOne({ _id: ObjectId(userId) })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const addItemToCart = async (userObjId, itemObjID) => {
  const filter = { _id: ObjectId(userObjId) };
  const updateDocument = { $addToSet: { itemCart: ObjectId(itemObjID) } };
  await userCollection.updateOne(filter, updateDocument).catch((error) => {
    throw new Error(error.message);
  });
};

const getItemsInCart = async (userObjId) => {
  const cursor = userCollection
    .find({ _id: ObjectId(userObjId) })
    .project({ itemCart: 1, _id: 0 });
  return await cursor.toArray().catch((error) => {
    throw new Error(error.message);
  });
};

const removeItemFromCart = async (userObjId, itemObjID) => {
  const filter = { _id: ObjectId(userObjId) };
  const updateDoc = { $pull: { itemCart: ObjectId(itemObjID) } };
  await userCollection.updateOne(filter, updateDoc).catch((error) => {
    throw new Error(error.message);
  });
};

const addItemToWishList = async (userObjId, itemObjID) => {
  const filter = { _id: ObjectId(userObjId) };
  const updateDocument = { $addToSet: { wishlist: ObjectId(itemObjID) } };
  await userCollection.updateOne(filter, updateDocument).catch((error) => {
    throw new Error(error.message);
  });
};

const getItemsInWishList = async (userObjId) => {
  const cursor = userCollection
    .find({ _id: ObjectId(userObjId) })
    .project({ wishlist: 1, _id: 0 });
  return await cursor.toArray().catch((error) => {
    throw new Error(error.message);
  });
};

const removeItemsFromWishList = async (userObjId, itemObjID) => {
  const filter = { _id: ObjectId(userObjId) };
  const updateDoc = { $pull: { wishlist: ObjectId(itemObjID) } };
  userCollection.updateOne(filter, updateDoc).catch((error) => {
    throw new Error(error.message);
  });
};

const getItemsFromPosted = async (userObjId) => {
  const cursor = userCollection.find({ _id: ObjectId(userObjId) }).project({
    items_post: 1,
    _id: 0,
  });
  return await cursor.toArray().catch((error) => {
    throw new Error(error.message);
  });
};

const addItemToPosted = async (userObjId, itemObjID) => {
  console.log(userObjId + itemObjID)
  const filter = { _id: ObjectId(userObjId) };
  const updateDocument = { $addToSet: { items_post: ObjectId(itemObjID) } };
  await userCollection.updateOne(filter, updateDocument).catch((error) => {
    throw new Error(error.message);
  });
}

// Item has been bought so remove all item from all wishlist and
// item cart in database. Additionally, move item from posted to sold
// for user that bought the item
const removeItemsFromCartAndWish = async (listOfItemIds) => {
  await userCollection.updateMany({}, { $pull: { wishlist: { $in: listOfItemIds }, itemCart: { $in: listOfItemIds } } })
}

// Move item from posted to sold for user that bought the item
const userSoldItem = async (userId, itemId) => {
  const filter = { _id: ObjectId(userId) }
  const updateDocument = {
    $addToSet: { items_sold: ObjectId(itemId) }
    // $pull: { items_post: ObjectId(itemId) }
  };

  await userCollection.updateOne(filter, updateDocument)
}

const userBoughtItem = async (userId, listOfItemIds) => {
  const filter = { _id: ObjectId(userId) }

  const finalList = listOfItemIds.map((x) => ObjectId(x));
  console.log(finalList)
  const updateDocument = { $push: { items_bought: { $each: finalList } } };

  await userCollection.updateOne(filter, updateDocument)
}
module.exports = {
  getAllUsersCol,
  insertUserCol,
  getUserByEmailCol,
  addItemToCart,
  getItemsInCart,
  removeItemFromCart,
  addItemToWishList,
  getItemsInWishList,
  removeItemsFromWishList,
  getItemsFromPosted,
  getUserByObjectId,
  addItemToPosted,
  removeItemsFromCartAndWish,
  userSoldItem,
  userBoughtItem,
  editUserInfo
};
