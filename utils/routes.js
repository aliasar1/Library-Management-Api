const express = require('express');
const userRoutes = require("../routes/adminRoutes");
const genreRoutes = require("../routes/genresRoutes");
const booksRoutes = require("../routes/booksRoutes");
const customerRoutes = require("../routes/customersRoutes");
const issueRoutes = require("../routes/issuesRoutes");
const returnRoutes = require("../routes/returnRoutes");
const errorHandler = require('../middlewares/errorHandler');

module.exports = function (app){
    app.use(express.json());
    app.use("/admin", userRoutes);
    app.use("/genres", genreRoutes);
    app.use("/books", booksRoutes);
    app.use("/customers", customerRoutes);
    app.use("/issues", issueRoutes);
    app.use("/returns", returnRoutes);
    app.use(errorHandler);
}