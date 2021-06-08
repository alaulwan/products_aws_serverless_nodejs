module.exports = {
    tables: [
        {
            "TableName": "products",
            "KeySchema": [
                {
                    "AttributeName": "ID",
                    "KeyType": "HASH"
                }
            ],
            "AttributeDefinitions": [
                {
                    "AttributeName": "ID",
                    "AttributeType": "S"
                }
            ],
            BillingMode: 'PAY_PER_REQUEST',
        }
    ]
}