const express = require('express')
const router = express.Router()
const va = require('./virtual-account')

router.get('/doku/version', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Jokul Node.js Payment (Direct API) v1.0.0",
        code: "",
        data: {}
    })
})

router.post('/doku/generate-va/mandiri', va.generateMandiriVa)

module.exports = router