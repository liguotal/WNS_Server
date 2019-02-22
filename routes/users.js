var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(JSON.stringify(req.headers)+'ceshi3')
  console.log(JSON.stringify(req.header)+'ceshi3')
  console.log(JSON.stringify(req.query)+'ceshi3')
  console.log(JSON.stringify(req)+'ceshi3')
  res.send('respond with a resource');
});
router.post('/',function(req, res, next) {
  console.log(JSON.stringify(req.body)+'ceshi2')
  res.send('respond with a resourcepost');
});
module.exports = router;
