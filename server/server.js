const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
// config dot env file
dotenv.config();

//databse call
connectDb();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/users", require("./routes/userRoute.js"));
app.use("/api/v1/transactions", require("./routes/transactionRoutes.js"));

//port
const PORT = process.env.PORT || 3000;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
