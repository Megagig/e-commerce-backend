const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// solving the cors origin errors
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

// bodyParser
app.use(bodyParser.json());

//cookie parser
app.use(cookieParser);

// Importing the routes
app.use('/api', require('./routes/authRoutes'));

app.get('/', (req, res) => res.send('My Backend Implementation'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
