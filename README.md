# products_aws_serverless_nodejs

This project was built with ```nodejs```, ```serverless framework```, ```aws DynamoDB``` and ```aws lambda functions```.

For Unit Tests, ```jest``` is used.

For documentation, ```Swagger``` is used.
________________________________________________________________________________

1.   **What APIs are deployed?**

- Lambda function to get one product by its id

<https://001n3v1ql1.execute-api.us-east-1.amazonaws.com/dev/product/(Product_Id)>

- Lambda function to get all products

<https://001n3v1ql1.execute-api.us-east-1.amazonaws.com/dev/product>

- Lambda function to fetch latest informations about products (it is also scheduled to run one time per hour)

<https://001n3v1ql1.execute-api.us-east-1.amazonaws.com/dev/update>

- Swagger UI:

<http://13.53.192.237:8180/swagger/>
________________________________________________________________________________
2.   **How to deploy?**

-- Requirements: nodejs > 12, npm, serverless framework

```    -   git clone https://github.com/alaulwan/products_aws_serverless_nodejs.git ```

```    -   cd products_aws_serverless_nodejs ```

-- In the file ```server.yml```, replace the value of ```provider.profile``` to the aws profile you want to use (one of the profile in your local aws credentials file)

```    -   npm install ```

```    -   serverless deploy ```
________________________________________________________________________________
3.   **How to run Unit Tests?**

-- Requirements: Java 8 or later

-- In the project directory run ```jest``` or ```npm test```
________________________________________________________________________________
4.   **How to build API swagger documentation?**

-- After deploying the project, swagger documentation will be generated and uploaded. You can download swagger.yaml file by running the command:

```    -   sls downloadDocumentation --outputFileName=swagger.yml ```

-- Then you can run Swagger UI:

```    -   docker run -p 8080:8080 -e BASE_URL=/swagger -e SWAGGER_JSON=/foo/swagger.yml -v <Path To Directory Of swagger.yml>:/foo swaggerapi/swagger-ui ```

-- Now you can access Swagger UI <http://localhost:8080/swagger>

