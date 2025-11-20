const express = require('express');
const app = express();
const path = require('path');

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
})

// Basic Approach: Render EJS template with static data
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/the-team', (req, res) => {
    res.render('the-team');
});

/* 
Advanced Approach: Render EJS template
with asynchronously fetched data
*/
app.get('/dynamic', async (req, res) => {
    const dynamicData = await fetchData();
    res.render('dynamic', { data: 'dynamicData' });
});

// Function to simulate asynchronous data fetching
async function fetchData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('Dynamic Content');
        }, 1000);
    });
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port localhost:${PORT}`);
});