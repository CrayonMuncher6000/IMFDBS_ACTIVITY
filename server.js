require('dotenv').config();
const express = require('express');
const cors = require('cors');
const scholarshipRoutes = require('./server/routes/scholarships');
const registerRoute = require('./server/routes/register');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/register', registerRoute);
app.use(express.static('src'));
app.use('/Css', express.static('Css'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/LogIn.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
