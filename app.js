const express = require("express");
const connectDb = require('./config/dbConnection');
require('dotenv').config();

const app = express();
connectDb();
require('./utils/routes')(app);

const port = process.env.PORT || 8010;
app.listen(port, () => console.log(`Listening on port ${port}...`));
