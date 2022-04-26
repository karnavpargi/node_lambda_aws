const fetch = require('node-fetch');
var parser = require('xml2json');
const { uploadJsonDataToS3Bucket } = require('./s3-bucket-function');

// fetch data from third-party API then upload to S3 bucket and return the json data.
exports.getXMLDataAndStoreToS3Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  } else if (!event.queryStringParameters) {
    return { statusCode: 400, body: 'Bad Request: provide queryStringParameters' };
  }

  try {
    // read the queryStringParameters
    const { page } = event.queryStringParameters;

    // get the XML data
    const fetchXMLResponse = await fetch(`http://restapi.adequateshop.com/api/Traveler?page=${page}`);

    // convert the XML data to JSON
    const responseData = await fetchXMLResponse.text();
    const responseJsonData = parser.toJson(responseData);

    // upload the JSON data to S3
    await uploadJsonDataToS3Bucket(`page${page || 1}.json`, responseJsonData);

    // return the response
    return { statusCode: 200, body: responseJsonData };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
