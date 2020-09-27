const express = require('express');

const playerCountsController = require('../controllers/playerCountsController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(playerCountsController.getPlayerCounts);

module.exports = router;