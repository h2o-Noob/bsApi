const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

dotenv.config({ path: "config/config.env" });

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
