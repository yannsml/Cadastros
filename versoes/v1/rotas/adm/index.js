const express = require('express')
const router = express.Router()


const CRUDEstado = require('./crudestado')
const CRUDCidade = require('./crudcidade')

router.use('/estado',
           CRUDEstado)

router.use('/cidade',
           CRUDCidade)

module.exports=router