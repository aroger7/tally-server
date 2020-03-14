const { subMonths } = require('date-fns');

const AppDay = require('../models/AppDay');

exports.updateMonthlyStats = async () => {
  console.log('updating monthly stats');
  const now = new Date();
  const lastMonth = subMonths(now, 1);

  await AppDay.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            { 
              $gte: [ 
                { 
                  $dateFromParts: {
                    year: '$year',
                    month: '$month',
                    day: '$day'
                  } 
                }, 
                { 
                  $dateFromParts: {
                    year: { $year: lastMonth },
                    month: { $month: lastMonth }
                  } 
                }
              ] 
            },
            {
              $lte: [
                { 
                  $dateFromParts: {
                    year: '$year',
                    month: '$month',
                    day: '$day'
                  } 
                }, 
                { 
                  $dateFromParts: {
                    year: { $year: now },
                    month: { $month: now },
                    day: { $dayOfMonth: now }
                  } 
                }
              ]
            }
          ]
        }
      }
    },
    {
      $group: {
        _id: '$appId',
        days: { $push: '$$ROOT' }
      }
    },
    {
      $addFields: {
        lastDays: {
          $filter: {
            input: '$days',
            cond: {
              $eq: ['$$this.month', { $month: lastMonth }]
            }
          }
        },
        days: {
          $filter: {
            input: '$days',
            cond: {
              $eq: ['$$this.month', { $month: now }]
            }
          }
        }
      }
    },
    {
      $addFields: {
        lastAverage: {
          $avg: {
            $map: {
              input: '$lastDays',
              in: '$$this.average'
            }
          }
        }
      }
    },
    {
      $addFields: {
        appId: '$_id',
        year: { $year: now },
        month: { $month: now },
        average: {
          $avg: {
            $map: {
              input: '$days',
              in: '$$this.average'
            }
          }
        },
        peak: {
          $max: {
            $map: {
              input: '$days',
              in: '$$this.peak'
            }
          }
        }
      }
    },
    {
      $addFields: {
        gain: {
          $subtract: ['$average', '$lastAverage']
        }
      }
    },
    {
      $project: {
        _id: 0,
        days: 0,
        lastDays: 0,
        lastAverage: 0
      }
    },
    {
      $merge: { into: 'appmonths', on: ['appId', 'year', 'month'] }
    }
  ]).allowDiskUse(true);

  console.log('finished updating monthly stats');
};