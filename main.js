const CryptoJS = require('crypto-js');

module.exports.requestHooks = [
    (context) => {
        // Validate context object
        if (context === null || context === undefined) {
            console.log('Invalid context.');
            return;
        }

        // Validate request
        if (
            !context.hasOwnProperty('request') ||
            context['request'] === null ||
            context['request'] === undefined ||
            context['request'].constructor.name != 'Object'
        ) {
            console.log('Invalid request.');
            return;
        }

        const request = context.request;

        const configurations = request.getEnvironmentVariable('bybitSignature');

        if(!configurations || !configurations.enabled) return;

        let signBase = '';
        const timestamp = request.getHeader('X-BAPI-TIMESTAMP');
        const apikey = request.getHeader('X-BAPI-API-KEY');
        const recvWindow = request.getHeader('X-BAPI-RECV-WINDOW');
        let parameters = '';

        switch(request.getMethod()){
            case 'GET':
                parameters = request.getParameters();
                let params = [];
                for (const p of parameters) { params.push(`${p.name}=${p.value}`) };
                signBase = timestamp + apikey + recvWindow + params.join('&');
                break;
            default:
                signBase = timestamp + apikey + recvWindow + request.getBody().text;
                break;
        }

        console.log(signBase);

        const signature = (CryptoJS.HmacSHA256(signBase, configurations.secret)).toString();

        request.setHeader('X-BAPI-SIGN', signature);
    }
]

console.log('Signature successfully added');
