const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require('./apiRouter').router;
const cors = require("cors");
var jsonwebtoken = require("jsonwebtoken");


var corsOptions = {
  origin: "http://localhost:8081"
};


require('./models/dbConfig');



const app = express();
app.use(cors(corsOptions));

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});



app.use('/api/', apiRouter);
const port = process.env.PORT || 3000

app.listen(port, () => console.log("server lancer sur le port " + port));