const queryOperators = ['lte', 'lt', 'gte', 'gt'];

const getFilters = (query = {}) => {
  return Object.keys(query)
    .reduce((acc, key) => {
      const value = query[key];
      if (value !== undefined) {
        const queryOperator = queryOperators.find((op) => key === op);
        const mappedKey = queryOperator ? `$${queryOperator}` : key;
        let mappedValue = value;

        if (typeof value === 'object' && value !== null) {
          mappedValue = getFilters(value);
        } else if (typeof value === 'string') {
          mappedValue = new RegExp(query[key], 'i');
        } 
        acc[mappedKey] = mappedValue;
      }
      return acc;
    }, {})
};

exports.getFilters = getFilters;