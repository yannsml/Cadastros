const express = require('express')
const router = express.Router()

const interfaceAdm = require('../versoes/v1/rotas/adm')

router.use("/v1/adm",interfaceAdm)

module.exports=router