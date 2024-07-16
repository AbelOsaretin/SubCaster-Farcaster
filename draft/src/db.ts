import mongoose from "mongoose";

// Create a MongoClient with a MongoClie>ntOptions object to set the Stable API version

async function connectDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    mongoose.connect(process.env.MONGODB_URI!);
    // Send a ping to confirm a successful connection
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

export default connectDB;
