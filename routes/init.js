console.log('App Routes:', require.resolve('./App.routes'));
console.log('News Routes:', require.resolve('./news/news.routes'));
console.log('News Details:', require.resolve('./news/newsDetails.routes'));
console.log('News Categories:', require.resolve('./news/newsCategories.routes'));

module.exports = (app) => {
    app.use('/', appRoutes);
    app.use('/news', newsRoutes);
    app.use('/newsDetails', newsDetailsRoutes);
    app.use('/newsCategories', newsCategories);
};