const AppYear = require('../models/AppYear');

exports.updateAllTimeStats = async () => {
  console.log('updating all time stats');

  await AppYear.aggregate([
    {
      $group: {
        _id: '$appId',
        years: {
          $push: '$$ROOT'
        }
      }
    },
    {
      $addFields: {
        average: {
          $avg: {
            $map: {
              input: '$years',
              in: '$$this.average'
            }
          }
        },
        peak: {
          $max: {
            $map: {
              input: '$years',
              in: '$$this.peak'
            }
          }
        }
      }
    },
    {
      $project: {
        years: 0
      }
    },
    {
      $merge: { into: 'apps' }
    }
  ]).allowDiskUse(true);

  console.log('finished updating all time stats');
};