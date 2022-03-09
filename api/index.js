const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();
require("./config/passport")(passport);

const taskRoute = require("./routes/tasks");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("Connected to MongoDB");
});

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(morgan("common"));
app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24,
      httpOnly: false, 
    },
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/tasks", taskRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.get('/', (req, res, next)=>{
  res.send("<h1>Hello</h1>")
  console.log("ojiuoijoiuoi", req.session)
  // res.status(200).json(req.session.passport);
});

app.listen(8800, () => {
  console.log("Backend server is running!");
});

