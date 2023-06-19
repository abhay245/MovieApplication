const express = require('express');
const app = express();
const cors = require('cors');
const mongo = require('./db.js');
mongo();
app.use(cors());
const port = 5000;
app.use(express.json());
const routes=require('./Routes.js')
app.use('/',routes);
app.listen(port, () => {
  console.log(`Food Delivery App listening on port ${port}`);
});
