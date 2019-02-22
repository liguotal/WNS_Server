var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/',function(req, res, next) {
  console.log(JSON.stringify(req.body)+'ceshi2')
  res.send('respond with a resourcepost');
});
module.exports = router;
