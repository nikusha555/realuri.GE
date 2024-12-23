import express from 'express';
import appRoutes from './App.routes.js';
import newsRoutes from './news/get/News.routes.js';
import newsDetailsRoutes from './news/get/newsDetails.routes.js';
import newsCategories from './news/get/newsCategories.routes.js';
import addNewsRoutes from './news/post/addNews.routes.js';
import editNewsRoutes from './news/edit/editNews.routes.js';
import deleteNewsRoutes from './news/delete/deleteNews.routes.js';


export default (app) => {
    app.use('/', appRoutes); // Ensure appRoutes is properly imported
    app.use('/news', newsRoutes);
    app.use('/newsDetails', newsDetailsRoutes);
    app.use('/newsCategories', newsCategories);
    app.use('/addNews', addNewsRoutes);
    app.use('/editNews', editNewsRoutes);
    app.use('/deleteNews', deleteNewsRoutes);
};
