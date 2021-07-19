const router = require("express").Router();
const eventsController = require('../../controllers/eventsController')

router
  .route('/')
  .post(eventsController.create)

module.exports = router;
