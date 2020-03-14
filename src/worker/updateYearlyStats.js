const { subYears } = require('date-fns');

const AppMonth = require('../models/AppMonth')

exports.updateYearlyStats = async () => {
  console.log('updating yearly stats');
  const now = new Date();
  const lastYear = subYears(now, 1);

  await AppMonth.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            {
              $gte: [
                {
                  $dateFromParts: {
                    year: '$year',
                    month: '$month'
                  }
                },
                {
                  $dateFromParts: {
                    year: { $year: lastYear }
                  }
                }
              ]
            },
            {
              $lte: [
                {
                  $dateFromParts: {
                    year: '$year',
                    month: '$month'
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
        months: { $push: '$$ROOT' }
      }
    },
    {
      $addFields: {
        lastMonths: {
          $filter: {
            input: '$months',
            cond: {
              $eq: ['$$this.year', { $year: lastYear }]
            }
          }
        },
        months: {
          $filter: {
            input: '$months',
            cond: {
              $eq: ['$$this.year', { $year: now }]
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
              input: '$lastMonths',
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
        average: {
          $avg: {
            $map: {
              input: '$months',
              in: '$$this.average'
            }
          }
        },
        peak: {
          $max: {
            $map: {
              input: '$months',
              in: '$$this.peak'
            }
          }
        }
      }
    },
    {
      $addFields: {
        gain: { $subtract: ['$average', '$lastAverage'] }
      }
    },
    {
      $project: {
        _id: 0,
        lastAverage: 0,
        lastMonths: 0,
        months: 0
      }
    },
    {
      $merge: { into: 'appyears', on: ['appId', 'year']}
    }
  ]).allowDiskUse(true);

  console.log('finished updating yearly stats');
};