const express = require("express");

const app = express();
app.use(express.json());

const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`Listening on port ${port}...`));