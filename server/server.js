require('dotenv').config();
const express = require('express');
const cors = require('cors');
const scholarshipRoutes = require('./routes/scholarships');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/scholarships', scholarshipRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
