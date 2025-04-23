const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const webhookUrl = "https://discord.com/api/webhooks/1364080704060784690/l1EcOAdXyCH5rQrwC4AxOGbEMN876wov85KxA1wdlTQ279wN0ks2h6Phvk_YQaEf7Qn8";

    const message = {
        content: "Hello from Netlify!",
    };

    await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ status: 'Message sent to Discord!' }),
    };
};
