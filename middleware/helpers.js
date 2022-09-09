const CryptoJS = require('crypto-js')
const { environment, server_sit, server_sandbox, server_production,
    client_id, merchant_name, shared_key } = require('../config/key')

exports.getConfiguration = () => {
    let serverLocation = ''
    if (environment == 'sit') {
        serverLocation = server_sit;
    } else if (environment == 'sandbox') {
        serverLocation = server_sandbox;
    } else if (environment == 'production') {
        serverLocation = server_production;
    } else {
        serverLocation = server_sandbox;
    }
    // console.log('serverLocation:',serverLocation)
    let config = {
        client_id: client_id,
        merchant_name: merchant_name,
        shared_key: shared_key,
        environment: environment,
        serverLocation: serverLocation,
        channel: "",
        request_id: "",
        request_timestamp: "",
        api_target: ""
    }
    return config
}

exports.paymentCodeRequest = {
    order: {
        invoice_number: "",
        amount: 0
    },
    virtual_account_info: {
        billing_type: "",
        expired_time: 0,
        reusable_status: true,
        info1: "",
        info2: "",
        info3: ""
    },
    customer: {
        name: "",
        email: ""
    },
    additional_info: {
    }
}

exports.createSignature = (setupConfiguration, paymentCodeRequest) => {
    var bodySha256 = CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(JSON.stringify(paymentCodeRequest)));
    var signatureComponents =
        "Client-Id:" + setupConfiguration.client_id + "\n"
        + "Request-Id:" + setupConfiguration.request_id + "\n"
        + "Request-Timestamp:" + setupConfiguration.request_timestamp + "\n"
        + "Request-Target:" + setupConfiguration.api_target + "\n"
        + "Digest:" + bodySha256;
    var signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(signatureComponents, setupConfiguration.shared_key));

    return signature;
}