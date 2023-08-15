require('dotenv').config();
const app = require('./app');

const PORT = process.env.port || 3333;

app.listen(PORT, (req, res) => {
 console.log(`Server is now running on PORT: ${PORT}`)
});