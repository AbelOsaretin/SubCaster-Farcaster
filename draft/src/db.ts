import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(
      "mongodb+srv://contactabel321:<password>@subcasterbot.rrct9sp.mongodb.net/?retryWrites=true&w=majority&appName=SubCasterBot"
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
