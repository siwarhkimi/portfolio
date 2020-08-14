const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// const db = require("./db/database");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + './client'));
// add uri addres of mongodb
const uri = process.env.URI;
// connect your database
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connected');
});


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: "cywarhkimi@gmail.com",
    pass: ""
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
});
transporter.sendMail({
  from: req.body.email,
  to: 'cywarhkimi@gmail.com',
  subject: req.body.subject,
  text: 'I hope this message gets delivered!'
}, (err, info) => {
  console.log(info.envelope);
  console.log(info.messageId);
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
