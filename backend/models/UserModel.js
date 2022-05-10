const mongoConnection = require("../mongoConnection");
const {ObjectId} = require('mongodb');
const userCollection = mongoConnection.collection("users");

const getAllUsersCol = async () => {
  const cursor = userCollection.find()
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

const addItemToCart = async (userObjId, itemObjID) => {
  const filter = {_id: ObjectId(userObjId)}
  const updateDocument = {$addToSet: {itemCart: [ObjectId(itemObjID)]}}
  await userCollection.updateOne(filter, updateDocument).catch((error) => {
    throw new Error(error.message)
  })
}

module.exports = { getAllUsersCol, insertUserCol, getUserByEmailCol, addItemToCart };
