const express = require("express");
const connectDb = require('./config/dbConnection');
require('dotenv').config();

const app = express();
app.use(express.json());
connectDb();

const genreRoutes = require("./routes/genresRoutes");
app.use("/genres", genreRoutes);

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

const port = process.env.PORT || 8010;
app.listen(port, () => console.log(`Listening on port ${port}...`));