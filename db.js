const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://davyyong9:<password>@cluster0.va6jabn.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection string
const dbName = 'INVOICER'; // Replace with your database name

const client = new MongoClient(uri);

const connectToDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully!');
    return client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

module.exports = { connectToDB };
