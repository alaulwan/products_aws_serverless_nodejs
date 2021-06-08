import regeneratorRuntime from "regenerator-runtime";
import Dynamo from '../lambdas/common/DynamoDB';

test('Dynamo is an function', () => {
    expect(typeof Dynamo).toBe('function');
});

test('Dynamo has get, writeItems, and batchedAsync function', () => {
    expect(typeof Dynamo.get).toBe('function');
    expect(typeof Dynamo.writeItems).toBe('function');
    expect(typeof Dynamo.batchedAsync).toBe('function');
});

const valiTableName = 'products';
const data = {
    "_links": {
      "productImages": {
        "href": "https://assignment.dwbt.tech/images/DW00100001",
        "title": "Product Images"
      }
    },
    "color": {
      "displayName": "N/A",
      "id": "Rose Gold"
    },
    "currency": "EUR",
    "description": "This classic and aesthetically pleasing timepiece was designed with great attention to detail. The playful colors of the NATO strap blends naturally with the simple and minimalistic dial, effortlessly creating the perfect accessory.",
    "ID": "DW00100001",
    "images": [
      {
        "order": "0",
        "src": "https://www.danielwellington.com/media/staticbucket/media/catalog/product/c/l/cl40-oxford-rg_1_1.png"
      },
      {
        "order": "1",
        "src": "https://www.danielwellington.com/media/staticbucket/media/catalog/product/d/w/dw_classic_40rg_closeup_front2.png"
      },
      {
        "order": "2",
        "src": "https://www.danielwellington.com/media/staticbucket/media/catalog/product/d/w/dw_classic_40rg_closeup_front1.png"
      },
      {
        "order": "3",
        "src": "https://www.danielwellington.com/media/staticbucket/media/catalog/product/d/w/dw_classic_40rg_closeup_back.png"
      },
      {
        "order": "4",
        "src": "https://www.danielwellington.com/media/staticbucket/media/catalog/product/c/l/cl-40-oxford-rg_3.png"
      },
      {
        "order": "5",
        "src": "https://www.danielwellington.com/media/staticbucket/media/catalog/product/b/o/box-classic-oxford-rg-40.png"
      }
    ],
    "name": "Classic Oxford 40 Rose Gold",
    "price": {
      "amount": "159",
      "fractionDigits": 2,
      "symbol": " €"
    },
    "size": "40mm",
    "sku": "DW00100001",
    "type": "watch"
  };

test('Dynamo write works', async () => {
    expect.assertions(1);
    try {
        const response = await Dynamo.write(data, valiTableName);
        expect(response).toBe(data);
    } catch (error) {
        console.log('error in dynamo write test', error);
    }
});

test('Dynamo get works', async () => {
    expect.assertions(1);
    try {
        const response = await Dynamo.get(data.ID, valiTableName);
        expect(response).toEqual(data);
    } catch (error) {
        console.log('error in dynamo get test', error);
    }
});