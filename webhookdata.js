let webhookData = null;

exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        try {
            webhookData = JSON.parse(event.body);
            console.log('Received data:', webhookData);
            return {
                statusCode: 200,
                body: JSON.stringify({ status: 'Webhook data received' }),
            };
        } catch (err) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid JSON' }),
            };
        }
    }

    if (event.httpMethod === 'GET') {
        const token = event.queryStringParameters?.token;
        if (token !== process.env.READ_TOKEN) {
            return {
                statusCode: 403,
                body: JSON.stringify({ error: 'Forbidden' }),
            };
        }

        if (webhookData) {
            return {
                statusCode: 200,
                body: JSON.stringify({ data: webhookData }),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'No data available' }),
            };
        }
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
};
