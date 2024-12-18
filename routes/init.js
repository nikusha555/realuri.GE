const express = require('express');
const appRoutes = require('./app.routes'); // Check case sensitivity
const newsRoutes = require('./news/news.routes');
const newsDetailsRoutes = require('./news/newsDetails.routes');
const newsCategories = require('./news/newsCategories.routes');

module.exports = (app) => {
    app.use('/', appRoutes); // Ensure appRoutes is properly imported
    app.use('/news', newsRoutes);
    app.use('/newsDetails', newsDetailsRoutes);
    app.use('/newsCategories', newsCategories);
};

module.exports = (app) => {
    app.use('/', appRoutes);
    app.use('/news', newsRoutes);
    app.use('/newsDetails', newsDetailsRoutes);
    app.use('/newsCategories', newsCategories);
};