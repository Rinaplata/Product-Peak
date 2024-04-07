const express = require('express');
const { connectDB } = require('./database/db');


const app = express();

// DB 

connectDB();

// Parsing body payload
app.use(express.json());

// app routes
app.use('/api/v1', require('./routes/User') );

app.listen(3000, () => {
  console.log(`SERVER RUNNING`);
});
