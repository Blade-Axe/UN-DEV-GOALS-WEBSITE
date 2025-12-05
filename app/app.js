const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const { body, validationResult } = require("express-validator");
const fs = require('fs');

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post(routes.subscribe, (req, res) => {
    console.log(req.body);
    const newSubscriber = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userEmail: req.body.userEmail,
        comments: req.body.userSubmission 
    };

    const filePath = path.join(__dirname, 'data.json');

    //Read existing file
    fs.readFile(filePath, 'utf8', (err, data) => {
        let subscribers = [];
        if (!err && data) {
            try {
                subscribers = JSON.parse(data);
            } catch (e) {
                console.error("Error parsing JSON", e);
            }
        }

        //Add new subscriber
        subscribers.push(newSubscriber);

        //Write back to file
        fs.writeFile(filePath, JSON.stringify(subscribers, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to save data' });
            }
            //Send success response back to frontend
            res.json(newSubscriber); 
        });
    });
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