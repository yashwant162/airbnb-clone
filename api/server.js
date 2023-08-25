const express = require("express");
const { allowedHosts } = require("./constants");
require("dotenv").config();
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT;
connectDB();

const app = express();

const cors = require("cors");

app.use(express.json());
app.use(cookieParser())
app.use(cors(allowedHosts));
app.use("/api/user", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server launched on http://localhost:${PORT}`);
});
