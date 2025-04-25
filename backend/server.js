const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const projectsRoute = require('./routes/projects');
const contactRoute = require('./routes/contact');

app.use('/api/projects', projectsRoute);
app.use('/api/contact', contactRoute);

app.use(express.static(path.join(__dirname, '../frontend')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on: http://localhost:${PORT}`));
