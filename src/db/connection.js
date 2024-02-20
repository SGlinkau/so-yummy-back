import { set, connect } from "mongoose";

set("strictQuery", true);

const connectToDatabase = async (url) =>
  await connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

export default {
  connectToDatabase,
};
