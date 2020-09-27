const pick = require('lodash.pick');
const pickBy = require('lodash.pickby');

exports.pickDefined = (obj, paths) => pick(pickBy(obj, (value) => value !== undefined), paths);
