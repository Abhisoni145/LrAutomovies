const express = require('express');
require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db_config');
const errorHandler = require('./middlewear/errorHandler');

const app = express();

const PORT = process.env.PORT || 5000;

//DB connection
connectDB();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    msg: 'Well Come To Car Remold',
  });
});

// user Routes
app.use('/api/user', require('./routes/userRoutes'));

// car service Routes
app.use('/api/service', require('./routes/carServiceRoutes'));

// admin service Routes
app.use('/api/admin', require('./routes/adminRoutes'));

//  errorHandler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running at PORT : ${PORT}`.bgRed.black);
});
