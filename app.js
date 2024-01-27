const express = require("express");
const connectDb = require('./config/dbConnection');
require('dotenv').config();

const app = express();
app.use(express.json());
connectDb();

const userRoutes = require("./routes/adminRoutes");
app.use("/admin", userRoutes);

const genreRoutes = require("./routes/genresRoutes");
app.use("/genres", genreRoutes);

const booksRoutes = require("./routes/booksRoutes");
app.use("/books", booksRoutes);

const customerRoutes = require("./routes/customersRoutes");
app.use("/customers", customerRoutes);

const issueRoutes = require("./routes/issuesRoutes");
app.use("/issues", issueRoutes);

const returnRoutes = require("./routes/returnRoutes");
app.use("/returns", returnRoutes);

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

const port = process.env.PORT || 8010;
app.listen(port, () => console.log(`Listening on port ${port}...`));
