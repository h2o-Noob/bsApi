const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
var cloudinary = require('cloudinary');

dotenv.config({ path: "config/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

const server = app.listen(process.env.PORT, () => {
  console.log(`server listening at http://localhost:${process.env.PORT}`);
  connectDatabase();
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shuttindown the server due to unHandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
