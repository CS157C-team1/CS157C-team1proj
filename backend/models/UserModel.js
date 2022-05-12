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
  addItemToPosted
};
