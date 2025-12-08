const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const { query } = require('express-validator');
const { body, validationResult } = require("express-validator");
const fs = require('fs');
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const navData = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/data/nav.json'), 'utf8'));
const footerData = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/data/footer.json'), 'utf8'));

const heroData = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/data/hero.json'), 'utf8'));
const teamData = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/data/team.json'), 'utf8'));
const goalsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/data/goals.json'), 'utf8'));
const subscribeData = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/data/subscribe.json'), 'utf8'));

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASS
    }
})

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.locals.routes = routes;
    res.locals.currentPath = req.path;
    
    res.locals.nav = navData; 
    res.locals.footer = footerData; 
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Approach: Render EJS template with static data
app.get(routes.home, (req, res) => {
    const indexCards = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/data/index-cards.json'), 'utf8'));
    res.render('index', 
    {
        title: 'UN DEV GOALS',
        hero: heroData,
        cards: indexCards
    });
});

app.get(routes.team, (req, res) => {
    const headerData = teamData[0];
    const membersData = teamData.slice(1);

    res.render('team', 
    {
        title: 'THE TEAM',
        teamHeader: headerData.teamHeader,
        teamMembers: membersData
    });
});

app.get(routes.subscribe, (req, res) => {
    res.render('subscribe',
        {
            title: 'SUBSCRIBE',
            content: subscribeData
        });
});

app.post(routes.subscribe, [
    body("firstName").trim().escape().notEmpty().withMessage("First name is required"),
    body("lastName").trim().escape().notEmpty().withMessage("Last name is required"),
    body("userEmail").trim().escape().isEmail().withMessage("Invalid email address"),
    body("userSubmission").trim().escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const newSubscriber = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userEmail: req.body.userEmail,
        comments: req.body.userSubmission 
    };

    transporter.sendMail({
        from: process.env.EMAIL,
        to: req.body.userEmail,
        subject: `Thank you for subscribing ${req.body.firstName}!`,
        text: `Your are now subscribed to the UN DEV Policy makers list!`
    })

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
    res.render('goals', 
        { 
            title: 'GOALS',
            content: goalsData
        });
});

app.get(routes.cleanWater, (req, res) => {
    res.render('cleanWater', {title: 'CLEAN WATER AND SANITATION'});
});

app.get(routes.climateAction, (req, res) => {
    res.render('climateAction', {title: 'CLIMATE ACTION'});
});

app.get(routes.cleanEnergy, (req, res) => {
    res.render('cleanEnergy', {title: 'CLEAN ENERGY'});
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port localhost:${PORT}`);
});