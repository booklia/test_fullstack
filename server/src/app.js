const express = require("express");

const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");

const app = express();
const port = 3001;
const allowCrossDomain = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
};

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(allowCrossDomain);
app.use("/", userRouter);
app.use("/", orderRouter);

app.listen(port, () => {
  console.log(`server running at https://localhost:${port}`);
});
