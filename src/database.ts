import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const mongooseEnv = process.env.MONGOOSE_DBA;

function connect() {
  mongoose
    .connect(mongooseEnv!, {})
    .then((db) => console.log("Database is connected"))
    .catch((err) => console.log(err));
}

export default connect;
