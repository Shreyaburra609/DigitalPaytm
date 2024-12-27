const express = require("express");

const dbconnect = require("./config/connection");

const userRouter = require("./routes/user");

const accountsRouter = require("./routes/account");

const cors = require("cors");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(express.urlencoded());

app.use(cors());

dbconnect;
app.get("/", (req, res) => {
  res.send("Hello, World! The server is running.");
});
app.use("/user", userRouter);

app.use("/account", accountsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
