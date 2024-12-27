const mongoose = require("mongoose");
const JWT_SECRET = "secret";

// MongoDB connection URL
const mongoURI  = "mongodb://127.0.0.1:27017/paytm";

const dbconnect = mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

module.exports = { dbconnect, JWT_SECRET };
