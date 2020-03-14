exports.getSortObjectFromQuery = (query = '', defaultSort = { _id: 1 }) => {
  const sort = query
    .split('|')
    .reduce((acc, pair) => {
      const pairArray = pair.split(':');
      const pairKey = pairArray[0];
      const mappedPairValue = getSortPairMappedValue(pairArray[1]);
      if (pairKey && mappedPairValue) {
        acc[pairKey] = mappedPairValue;
      }
      return acc;
    }, {});
  
  return Object.keys(sort).length > 0 ? sort : defaultSort;
}

const getSortPairMappedValue = (pairValue) => {
  if (pairValue === 'asc') {
    return 1;
  }
  if (pairValue === 'desc') {
    return -1;
  }
}