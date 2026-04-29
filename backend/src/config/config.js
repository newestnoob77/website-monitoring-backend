import mongoose from "mongoose";
export const connectMongodb = async () => {
  try {
    console.log(process.env.DB_URL);
    await mongoose.connect(process.env.DB_URL);
    console.log("Mongodb connected");
  } catch (err) {
    console.log(err);
  }
};
