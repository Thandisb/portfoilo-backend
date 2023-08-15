const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('*', (req, res) => {
    res.status(404).send('Page Not Found')
})

module.exports=app;