const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const quotes = require('./quotes/quotes.json');

app.use(express.json());

app.get('/', (req,res) => {
    res.send(`
        <h1> Endpoints: </h1>
        <p>Grab a random quote using /random</p>
        <p>Grab quote by category using /:category/random</p>
        <p>Grab an amount of random quotes using /random/:number</p>
        <p>Grab an amount of random quotes by category using /:category/random/:number</p>
        <h1> Categories you can search </h1>
        <p> love,life,motivational,wisdom </p>
        <h1> Examples: </h1>
        <h3> Quote By Category </h3> <p>/love/random </p>
        <h3> 3 Random Quotes </h3> <p> /random/3 </p>
        <h3> 5 Random Quotes By Category </h3> <p> /life/random/5 </p>
    `
    );
})

app.get('/random', (req,res) => {
    res.send(quotes[Math.floor(Math.random() * quotes.length)]);
});

// Categories /wisdom /love /motivational /life
app.get('/:category/random', (req,res) => {
    const categoryQuotes = quotes.filter(quote => quote.category === req.params.category);
    res.send(categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)]);
})

app.get('/random/:number', (req,res) => {
    res.send(randomQuotes(quotes,req.params.number));
});

app.get('/:category/random/:number', (req,res) => {
    const categoryQuotes = quotes.filter(quote => quote.category === req.params.category);
    res.send(randomQuotes(categoryQuotes,req.params.number));
});

function randomQuotes(array,userLimit) {
    const randomQuotesSet = new Set();
    //Just in case user enters bigger amount than the json file has
    const limit = userLimit > array.length ? array.length : userLimit;
    while(randomQuotesSet.size < limit) {
        const randomNum = Math.floor(Math.random() * array.length);
        if(!randomQuotesSet.has(randomNum)) randomQuotesSet.add(randomNum);
    }

    //Set -> Array
    return Array.from(randomQuotesSet).map(quoteIndex => array[quoteIndex]);
};

app.listen(PORT, console.log(`Running on port ${PORT}`));