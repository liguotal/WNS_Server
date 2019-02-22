var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/',function(req, res, next) {
  console.log(JSON.stringify(req.body)+'ceshi1')
  res.send('respond with a resourcepost2');
});
module.exports = router;
