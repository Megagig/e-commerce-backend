const express = require('express');
const app = express();
require('dotenv').config();

// Importing the routes
app.use('/api', require('./routes/authRoutes'));

app.get('/', (req, res) => res.send('My Backend Implementation'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
