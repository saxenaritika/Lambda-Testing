const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.scanTable = async () => {
    const items = "Testing lambda layer"
    return {
        items
    };
};