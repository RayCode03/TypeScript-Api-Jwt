import app from "./app";
import dotenv from "dotenv";
import connect from "./database";

dotenv.config();

// settings
const PORT = process.env.PORT || 5000;

function main() {
  app.listen(PORT, () => {
    connect();
    console.log(`Server listening on port ${PORT}`);
  });
}

main();
