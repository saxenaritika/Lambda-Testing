const AWS = require("aws-sdk");
require('dotenv').config()

const dynamo = new AWS.DynamoDB.DocumentClient({endpoint: process.env.DB_ENDPOINT});

exports.handler = async (event) => {

	let response = {
		statusCode: 200,
		body:null
	};

	let bodyToPut = {};
	bodyToPut.TableName ="my-sam-table";
	bodyToPut.operation = "create";
	bodyToPut.Item = {
		id: new Date().toString(),
		name: "demoUser",
	};

	try {
		console.log("before dynamodb")
		await dynamo.put(bodyToPut).promise();
		console.log("Success: Everything executed correctly");
		response.body = "Item created";
	} catch (err) {
		console.log('inside catch')
		console.error(err);
		response.body = err;
	}

	let result = {
		body: JSON.stringify(response.body),
		statusCode: response.statusCode,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
			"Access-Control-Allow-Methods": "OPTIONS,GET,POST",
			"Access-Control-Allow-Credentials": true,
			"Access-Control-Allow-Origin": "*",
			"X-Requested-With": "*",
		},
	};

	return result;
};
