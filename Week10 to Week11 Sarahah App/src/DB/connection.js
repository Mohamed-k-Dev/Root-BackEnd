import mongoose from "mongoose";

const database_connection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("database connection is established");
  } catch (error) {
    console.log(`something went wrong on connecting on database ${error}`);
  }
};
export default database_connection;
