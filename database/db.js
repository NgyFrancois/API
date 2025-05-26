import mongoose from "mongoose";

const mongoURL = "mongodb://localhost:27017/Projet_Z";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected successfully ✅");
  } catch (err) {
    console.log("Failed connection ❌", err);
    process.exit(1); // Arrêter le processus en cas d'échec
  }
};

export default connectDB;
