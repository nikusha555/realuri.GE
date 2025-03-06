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
import projects from '../routes/projects/get/projects.routes.js';
import addProjects from '../routes/projects/post/addProject.routes.js';
import editProjects from '../routes/projects/edit/editProjects.routes.js';
import deleteProjects from '../routes/projects/delete/deleteProjects.routes.js'


export default (app) => {
    app.use('/', appRoutes);
    app.use('/news', newsRoutes);
    app.use('/newsDetails', newsDetailsRoutes);
    // app.use('/newsCategories', newsCategories);  დროებით ჩავხსენი
    app.use('/addNews', adminAuth, addNewsRoutes);
    app.use('/editNews', adminAuth, editNewsRoutes);
    app.use('/deleteNews', adminAuth, deleteNewsRoutes);
    app.use('/login', loginRoutes);
    app.use('/projects', projects);
    app.use('/addProjects', addProjects);
    app.use('/editProjects', adminAuth, editProjects);
    app.use('/deleteProjects', deleteProjects)
};
