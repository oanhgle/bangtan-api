const express = require('express');
const app = express();
const routes = require('./routes');
var path    = require("path");
const port = process.env.PORT || 3000; 

/*
 * middleware
 * If you are using Express 4.16+ you don't have to import body-parser anymore.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*
 * indent prettified JSON
 */
app.set('json spaces', 2);


/*
 * enabling CORS
 */
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/* 
 * homepage 
 */
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+ '/public/index.html'));
}); 

/* 
 * routes
 */
app.use('/', routes);

/*
 * error handlers 
 */
app.use(function (err, req, res, next) {
  if (err) {
    res.status(500).send(err);
    return;
  }
}); 

/*
 * listen port
 */
app.listen(port, () => {
  console.log(`Server currently running on port ${port}. Visit http://localhost:${port}/`);
});
