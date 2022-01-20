import mongoose from "mongoose";
import { logError, logSuccess } from "./logColors";

const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DB_URL);

    logSuccess("DB: Connection established.");
  } catch (error) {
    logError("DB: Connection error!");
  }
};

export default { connect };
