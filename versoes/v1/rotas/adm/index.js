const express = require('express')
const router = express.Router()


const CRUDEstado = require('./crudestado')

router.use('/estado',
           CRUDEstado)

module.exports=router