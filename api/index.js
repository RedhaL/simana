const express = require("express");
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")


const taskRoute = require("./routes/tasks")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")

app.use(cors({
  origin: 'http://localhost:3000'
}));

dotenv.config(); 

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true},()=>{
  console.log("Connected to MongoDB")
});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.use("/api/tasks", taskRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);


app.listen(8800,()=>{
  console.log("Backend server is running!")
})