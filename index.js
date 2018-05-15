const fs = require('fs');
const buildUrl = require('build-url');
const request = require('request');
const rp = require('request-promise-native');
const padStart = require('pad-start');
const jwt = require('jsonwebtoken');
const delay = require('delay');
require('dotenv').config();

const contents = fs.readFileSync('./output.json');
const images = JSON.parse(contents);

const postPromises = images.map(image => {
  const startDate = new Date(`${image['DATE START']} GMT`);
  const startString = startDate.toISOString();
  const completeDate = new Date(`${image['DATE OF COMPLETION']} GMT`);
  const completeString = completeDate.toISOString();
  // My _id '5a71f324d79c3e001085c896'
  const token = jwt.sign(
    {
    _id: '5ac4842b26964b0010033104',
    name: 'Yves Barthelemy',
    contact_email: 'zanzibarzmi@gmail.com'
    },
  process.env.JWT_SECRET_KEY,
  { algorithm: 'HS256',
    expiresIn: '9d'
  }
  );
  const url = buildUrl('https://api.openaerialmap.org/dronedeploy', {
    queryParams: {
      token: token,
      sensor: encodeURIComponent(image.platform),
      acquisition_start: encodeURIComponent(startString),
      acquisition_end: encodeURIComponent(completeString),
      title: encodeURIComponent(image.zone_ID),
      provider: encodeURIComponent(image.Attribution),
      tags: ''
    }
  });
  const paddedId = padStart(image.zone_ID, 3, '0');
  const downloadPath = `http://195.154.41.149/download/U_${paddedId}_V1.tif`
  const options = {
    method: 'POST',
    uri: url,
    body: {
      download_path: downloadPath
    },
    json: true
  };
  const postPromise = rp(options).then(delay(5000));
  return postPromise;
});

Promise.all(postPromises)
  .then(values => {
    console.log(values);
  })
  .catch(error => {
    console.log(error);
  });


