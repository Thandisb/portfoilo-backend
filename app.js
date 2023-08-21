const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const app = express();

const restaurantController = require("./controllers/restaurantsController")
//const reviewController = require('./controllers/reviewController')

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/restaurants', restaurantController)
//app.use("/reviews", reviewController)

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('*', (req, res) => {
    res.status(404).send('Page Not Found')
})

module.exports=app;