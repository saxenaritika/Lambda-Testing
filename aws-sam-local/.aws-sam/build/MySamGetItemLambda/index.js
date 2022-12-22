const AWS = require("aws-sdk");
const { scanTable } = require("/opt/db.js");

exports.handler = async () => {
	console.log("Dynamodb get item lambda running");

	let response = {
		statusCode: 200,
		body: null,
	};

	try {
		response.body = await scanTable();



		console.log("Success: Everything executed correctly");
	} catch (err) {
		console.error("error happened:", err);
		
		response.body = err;
	}

	let res = {
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

	return res;
};
