var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    const ret = {
      "href": "http://localhost:8080/index.json",
      "rel": "/",
      "learning" : {
          "href": "http://localhost:8080/learning/index.json",
          "rel": "/learning",
          "title": "learn"
      },
      "todos": {
          "href": "http://localhost:8080/todos/index.json",
          "rel": "/todos",
          "title": "todo"
      },
      "hours": {
          "href": "http://localhost:8080/hours/index.json",
          "rel": "/hours",
          "title": "hours"
      }
    };
    res.json(ret);
});

module.exports = router;
