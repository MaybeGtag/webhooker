// netlify/functions/get-webhook-data.js

let webhookData = null; // Temporary in-memory store

// Handle POST request from Discord webhook
exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        // Save the incoming webhook data
        webhookData = JSON.parse(event.body);
        console.log('Received data:', webhookData);
        
        return {
            statusCode: 200,
            body: JSON.stringify({ status: 'Webhook data received' }),
        };
    }
    
    // Handle GET request to send data to frontend
    if (event.httpMethod === 'GET') {
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

    // Default response for unsupported methods
    return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
};
