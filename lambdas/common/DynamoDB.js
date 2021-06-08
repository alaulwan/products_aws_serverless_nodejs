import * as AWS from 'aws-sdk';

let options = {};

if(process.env.JEST_WORKER_ID){
  options = {
    endpoint: 'http://localhost:8000',
    region: 'local-env',
    sslEnabled: false
  }
}

const documentClient = new AWS.DynamoDB.DocumentClient(options);

export default class Dynamo {
    static async getAll(TableName){
        const params = {
            TableName
        };

        const data = await documentClient.scan(params).promise();
        if(!data || !data.Items){
            throw Error(`There was an error fetching the data from ${TableName}`);
        }

        return data.Items;
    }

    static async get(ID, TableName){
        const params = {
            TableName,
            Key: {
                ID
            }
        };

        const data = await documentClient.get(params).promise();
        if(!data || !data.Item){
            throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`);
        }

        return data.Item;
    }

    static async write(data, TableName){
        if(!data.ID){
            throw Error('No ID on the data');
        }
        const params = {
            TableName,
            Item: data
        };

        const res = await documentClient.put(params).promise();
        if(!res){
            throw Error(`There was an error inserting ID of ${data.ID} into table ${TableName}`);
        }

        return data;
    }

    static async batchedAsync({list, tableName, chunkSize=10, msDelayBetweenChunks=0}) {
        const emptyList = new Array(Math.ceil(list.length / chunkSize)).fill();
        const clonedList = list.slice(0);
        const chunks = emptyList.map(_ => clonedList.splice(0, chunkSize));
        for (let chunk of chunks) {
          if (msDelayBetweenChunks) {
            await Dynamo.wait(msDelayBetweenChunks);
          }
          await Dynamo.writeItems(tableName, chunk, chunks);
        }
        return list;
      }
      
      static async writeItems(tableName, chunk, chunks) {
        const {UnprocessedItems} = await documentClient.batchWrite({
          RequestItems: {
            [tableName]: chunk.map(item => {
              return {PutRequest: {Item: item}};
            })
          }
        }).promise();
        if (UnprocessedItems.length) {
          chunks.push(UnprocessedItems);
        }
      }

      static wait(msDelayBetweenChunks){
        return new Promise(resolve => setTimeout(resolve, msDelayBetweenChunks));
      }
}
