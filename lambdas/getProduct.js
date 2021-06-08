'use strict';
import Responses from './common/Responses';
import hooksWithValidation from './common/hooks';
import Dynamo from './common/DynamoDB';
import * as yup from 'yup';

const tableName = process.env.tableName;

const pathSchema = yup.object().shape({
    ID: yup.string().required()
});

async function handler(event) {
    const ID = event.pathParameters.ID;
    const product = await Dynamo.get(ID, tableName);
    return Responses._200(product);
};

exports.handler = hooksWithValidation({ pathSchema })(handler);
