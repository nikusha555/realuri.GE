const express = require('express');
const appRoutes = require('./App.routes');
const newsRoutes = require('./news/news.routes');
const newsDetailsRoutes = require('./news/newsDetails.routes');
const newsCategories = require('./news/newsCategories.routes');

module.exports = (app) => {
    app.use('/', appRoutes);
    app.use('/news', newsRoutes);
    app.use('/newsDetails', newsDetailsRoutes);
    app.use('/newsCategories', newsCategories);
};