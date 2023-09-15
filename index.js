const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const auth = require("./routes/auth");
const user = require("./routes/user");
const doctor = require("./routes/doctor");
const review = require("./routes/rev");
const mongoose = require("mongoose");
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const corsOptions = { origin: true };
// database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected");
  } catch (error) {
    console.log("connection failed");
  }
};
// middleware
app.use(express.json());
app.use(cookieparser());
app.use(cors(corsOptions));
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/doctor", doctor);
app.use("/api/review", review);
connectDB();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
