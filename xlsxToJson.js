const xlsxToJson = require('xlsx-to-json');

xlsxToJson({
  input: 'UNG_ZONES_3x3_METADATA_V1.1.xlsx',
  output: 'outputV1.json',
  sheet: 'UNG_ZONES_3x3'
}, (err, result) => {
  if (err) {
    console.log(err);
  };
});
