function parseFields(fields) {
  var res = {};
  var keys = Object.keys(fields);
  for (var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i];
    res[key] = parseValue(fields[key]);
  }
  return res;
}

function parseValue(value) {
  var type = Object.keys(value)[0];

  switch (type) {
    case 'geoPointValue':
      return [value.geoPointValue.latitude, value.geoPointValue.longitude];
    case 'arrayValue':
      return (value.arrayValue.values || []).map(parseValue);
    case 'mapValue':
      return parseFields(value.mapValue.fields);
    case 'integerValue':
    case 'doubleValue':
      return Number(value[type]);
    case 'timestampValue':
      return new Date(value[type]);
    default:
      return value[type];
  }
}

module.exports = parseFields;
