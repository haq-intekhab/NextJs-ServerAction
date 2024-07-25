import mongoose from "mongoose";

const connectToDb = async () => {
  const url = "mongodb://localhost:27017";

  mongoose
    .connect(url)
    .then(() => console.log("Database connection is successful"))
    .catch((e) => console.log(e));
};

export default connectToDb;