require('dotenv').config()

module.exports = {
    env: process.env.NODE_ENV,
    debug: process.env.DEBUG,
    port: process.env.PORT,
    maxsize: process.env.MAXSIZE,
    maxfile: process.env.MAXFILES,
    interval: process.env.INTERVAL,
    size: process.env.SIZE,    
    limit_json: process.env.LIMIT_JSON,
    limit_urlencode: process.env.LIMIT_URLENCODE,
    client_id: process.env.CLIENT_ID,
    environment: process.env.ENVIRONTMENT,
    server_sit: process.env.SERVER_SIT,
    server_sandbox: process.env.SERVER_SANDBOX,
    server_production: process.env.SERVER_PRODUCTION,
    merchant_name: process.env.MERCHANT_NAME,
    shared_key: process.env.SHARED_KEY
}