'use strict';
import Responses from './common/Responses';
import hooksWithValidation from './common/hooks';
import Dynamo from './common/DynamoDB';

const tableName = process.env.tableName;

async function handler(event) {
    const ID = event.pathParameters.ID;
    const products = await Dynamo.getAll(tableName);
    return Responses._200(products);
};

exports.handler = hooksWithValidation({})(handler);
