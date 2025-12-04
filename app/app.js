const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.locals.routes = routes;
    res.locals.currentPath = req.path;
    next();
})

// Basic Approach: Render EJS template with static data
app.get(routes.home, (req, res) => {
    res.render('index', {title: 'UN DEV GOALS'});
});

app.get(routes.team, (req, res) => {
    res.render('team', { title: 'THE TEAM' });
});

app.get(routes.subscribe, (req, res) => {
    res.render('subscribe', { title: 'SUBSCRIBE' });
});

app.get(routes.goals, (req, res) => {
    res.render('goals', { title: 'GOALS' });
});

app.get(routes.cleanWater, (req, res) => {
    res.render('cleanWater', {title: 'CLEAN WATER AND SANITATION'});
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port localhost:${PORT}`);
});