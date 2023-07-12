const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongo = require('./db.js');
const helmet = require('helmet');
const  xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
mongo();
app.use(cors());
app.use(express.static(path.resolve(__dirname, './client/build')));

const port = 5000;
app.use(express.json());
const routes=require('./Routes.js')
app.use('/',routes);
app.listen(port, () => {
  console.log(`Food Delivery App listening on port ${port}`);
});
