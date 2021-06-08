export default class Responses{
    static _200(data){
        return Responses.response(200, data)
    }

    static _400(data){
        return Responses.response(400, data)
    }
    
    static response(statusCode, data = {}){
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            },
            statusCode: statusCode,
            body: JSON.stringify(data, null, 2)
        }
    }
}