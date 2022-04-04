require('dotenv').config();

const {MongoClient} = require('mongodb');

const client = new MongoClient(process.env.DB_URI);

client.connect((err) => {
    if(err) {
        throw new Error(`Cannot connect to MongoDB: ${err.message}`);
    }
    
    console.log('Connected to MongoDB server')
})


module.exports = client;