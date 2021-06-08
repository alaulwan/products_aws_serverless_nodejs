'use strict';
import Responses from './common/Responses';
import hooksWithValidation from './common/hooks';
import Dynamo from './common/DynamoDB';
import * as axios from 'axios';

const tableName = process.env.tableName;

async function handler(event) {

    const productsResponsePromise = axios.get('https://assignment.dwbt.tech/products');
    const imagesResponsePromise = axios.get('https://assignment.dwbt.tech/images');

    let values = await Promise.all([productsResponsePromise, imagesResponsePromise]);

    const productsList = values[0].data.products;
    const productIdimagesMap = values[1].data.images;

    productsList.forEach(product => {
        const productId = product.sku;
        product.ID = productId;
        product.images = productIdimagesMap[productId];
    });

    const newProducts = await Dynamo.batchedAsync({
        list: productsList,
        tableName: tableName,
        chunkSize: 20, // adjust to provisioned throughput. Max 25 (batchWrite dynamodb limit)
        msDelayBetweenChunks: 100
      });

    return Responses._200(newProducts);
};

exports.handler = hooksWithValidation({})(handler);

