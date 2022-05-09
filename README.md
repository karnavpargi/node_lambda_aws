# Test project based on nodeJS, ExpressJS, Serverless, s3Bucket.

## Requirements

- NodeJS 14.x
- Serverless
- Lambda

## Used packages

- aws-sdk (used for s3 bucket)
- node-fetch (to call third-party API)
- xml2json (convert XML to JSON)


To build and start API in your local machine run the following in your shell:

```bash
sam build
sam local start-api
```

To build and deploy your application run the following in your shell:

```bash
sam build
sam deploy
```

## API Gateway 
[getXMLDataAndStoreToS3Function](https://n3mw79yn7c.execute-api.ap-south-1.amazonaws.com/Prod/?page=1)
