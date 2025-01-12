import express from 'express';
import appRoutes from './App.routes.js';
import newsRoutes from './news/get/News.routes.js';
import newsDetailsRoutes from './news/get/newsDetails.routes.js';
import newsCategories from './news/get/newsCategories.routes.js';
import addNewsRoutes from './news/post/addNews.routes.js';
import editNewsRoutes from './news/edit/editNews.routes.js';
import deleteNewsRoutes from './news/delete/deleteNews.routes.js';
import loginRoutes from './admin/login.routes.js';
import adminAuth from '../middleware/admin.auth.js';

export default (app) => {
    app.use('/', appRoutes); // Ensure appRoutes is properly imported
    app.use('/news', newsRoutes);
    app.use('/newsDetails', newsDetailsRoutes);
    app.use('/newsCategories', newsCategories);
    app.use('/addNews',  adminAuth, addNewsRoutes);
    app.use('/editNews',  adminAuth, editNewsRoutes);
    app.use('/deleteNews', adminAuth, deleteNewsRoutes);
    app.use('/login', loginRoutes)
};
