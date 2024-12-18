import express from 'express';
import appRoutes from './App.routes.js';
import newsRoutes from './news/news.routes.js';
import newsDetailsRoutes from './news/newsDetails.routes.js';
import newsCategories from './news/newsCategories.routes.js';

export default (app) => {
    app.use('/', appRoutes); // Ensure appRoutes is properly imported
    app.use('/news', newsRoutes);
    app.use('/newsDetails', newsDetailsRoutes);
    app.use('/newsCategories', newsCategories);
};
