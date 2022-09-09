const writelog = require('@thesuhu/writelog')
const axios = require('axios')
const crypto = require('crypto')
const { getConfiguration, paymentCodeRequest, createSignature } = require('../middleware/helpers')
const msg = require('../config/message-code')

exports.generateMandiriVa = async (req, res) => {
    const rb = req.body
    let setupConfiguration = await getConfiguration()
    setupConfiguration.channel = 'mandiri'
    setupConfiguration.api_target = '/mandiri-virtual-account/v2/payment-code'
    setupConfiguration.request_id = crypto.randomUUID()
    setupConfiguration.request_timestamp = new Date().toISOString().slice(0, 19) + "Z"

    let hmac = "HMACSHA256="

    paymentCodeRequest.order.invoice_number = rb.invoice_number
    paymentCodeRequest.order.amount = rb.amount
    paymentCodeRequest.virtual_account_info.billing_type = "FIX_BILL"
    paymentCodeRequest.virtual_account_info.expired_time = rb.expiredTime != null ? rb.expiredTime : 60;
    paymentCodeRequest.virtual_account_info.reusable_status = rb.reusableStatus != null ? rb.reusableStatus : false
    paymentCodeRequest.virtual_account_info.info1 = rb.info1
    paymentCodeRequest.virtual_account_info.info2 = rb.info2
    paymentCodeRequest.virtual_account_info.info3 = rb.info3
    paymentCodeRequest.customer.name = rb.customerName
    paymentCodeRequest.customer.email = rb.email

    delete paymentCodeRequest['additional_info']
    
    // console.log(paymentCodeRequest)

    try {
        let axiosConfig = {
            headers: {
                'Client-Id': setupConfiguration.client_id,
                'Request-Id': setupConfiguration.request_id,
                'Request-Timestamp': setupConfiguration.request_timestamp,
                'Signature': hmac + await createSignature(setupConfiguration, paymentCodeRequest),
            }
        }

        // console.log(axiosConfig)

        const url = setupConfiguration.serverLocation + setupConfiguration.api_target

        // console.log(url)

        const response = await axios.post(url, paymentCodeRequest, axiosConfig)

        // console.log(response)

        // if succeed, save response data (virtual_account_info) to database 
        // the return below is for example purpose, you may change the response data with yours for front-end consume
        return res.status(200).json({
            success: true,
            message: msg.MSG20018,
            code: "20018",
            data: response.data
        })
    } catch (error) {
        let dataError = error.response.data.error
        writelog.error(error.message)
        return res.status(500).json({
            success: false,
            message: msg.MSG50001,
            code: "50001",
            data: dataError ? dataError : ''
        })
    }
}