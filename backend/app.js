const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./helpers/jwt");
const errHandler = require("./helpers/error-handler");
app.use(cors());
//allow for all http requests from frontend
app.options("*", cors());

//middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
//with this middleware , our server is secured based on the token,so any request will come, will bbe asked authentication
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
//handle any error from server
app.use(errHandler);

//Routes
const productsRoutes = require("./routes/products");
const categoriesRoutes = require("./routes/categories");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//Database
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "storereach",
  })
  .then(() => {
    console.log("database connection established");
  })
  .catch((err) => {
    console.log(err);
  });

//Server
app.listen(3000, () => {
  console.log("server listening on port 3000");
});
