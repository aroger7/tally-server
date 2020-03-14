const express = require('express');

const appsController = require('../controllers/appsController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(appsController.getApps);

router
  .route('/:id')
  .get(appsController.getApp);

router
  .route('/:id/playerCounts')
  .get(appsController.getPlayerCounts)

module.exports = router;