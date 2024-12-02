const express = require('express');
const appRoutes = require('./App.routes');
const newsRoutes = require('./News.routes');

module.exports = (app) => {
    app.use('/', appRoutes);
    app.use('/news', newsRoutes);
};