const { subDays } = require('date-fns');

const PlayerCount = require('../models/PlayerCount');

exports.updateDailyStats = async () => {
  console.log('updating daily stats');
  const now = new Date();
  const yesterday = subDays(now, 1);
  
  await PlayerCount.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            { 
              $gte: [
                { $toDate: '$_id' },
                { 
                  $dateFromParts: {
                    year: { $year: yesterday },
                    month: { $month: yesterday },
                    day: { $dayOfMonth: yesterday }
                  }
                }
              ]
            },
            {
              $lte: [
                { $toDate: '$_id' },
                now
              ]
            }
          ]
        }
      }
    },
    { 
      $group: { 
        _id: '$appId',
        playerCounts: { 
          $push: '$$ROOT' 
        } 
      } 
    },
    {
      $addFields: {
        yesterdayCounts: {
          $filter: {
            input: '$playerCounts',
            cond: {
              $eq: [{ $dayOfMonth: yesterday }, { $dayOfMonth: { $toDate: '$$this._id' } }]
            }
          }
        },
        counts: {
          $filter: {
            input: '$playerCounts',
            cond: {
              $eq: [{ $dayOfMonth: now }, { $dayOfMonth: { $toDate: '$$this._id' } }]
            }
          }
        }
      }
    },
    {
      $addFields: {
        yesterdayAverage: {
          $avg: {
            $map: {
              input: '$yesterdayCounts',
              in: '$$this.count'
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
        day: { $dayOfMonth: now },
        average: {
          $avg: {
            $map: {
              input: '$counts',
              in: '$$this.count'
            }
          }
        },
        peak: {
          $max: {
            $map: {
              input: '$counts',
              in: '$$this.count'
            }
          }
        }
      }
    },
    {
      $addFields: {
        gain: {
          $subtract: ['$average', '$yesterdayAverage']
        }
      }
    },
    { 
      $project: {
        _id: 0,
        playerCounts: 0,
        yesterdayAverage: 0,
        yesterdayCounts: 0
      }
    },
    { $merge: { into: 'appdays', on: ['appId', 'year', 'month', 'day'] } }
  ]).allowDiskUse(true);

  console.log('finished updating daily stats');
}