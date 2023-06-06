const cors = require('cors');
const express = require('express');

const userRoutes = require('./routes/user.routes');
const repairRoutes = require('./routes/repair.routes');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/repairs', repairRoutes);

module.exports = app;
