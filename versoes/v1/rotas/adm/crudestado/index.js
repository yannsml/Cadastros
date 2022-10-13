require('dotenv').config();
const express = require('express')
const router = express.Router()
const estadoController = require("../../../models/estado/controller")

router.post("/",async(req,res)=>{
    try{
        if(req.body.nomeestado === null || req.body.nomeestado === undefined ||
           req.body.ufestado   === null || req.body.ufestado   === undefined){
            throw {
                "msg":"Informe todos os campos"
            }
        }
        let result = await estadoController.criarEstado(req.body.nomeestado,
                                                        req.body.ufestado)
        let msg = {
            "msg":"Criado",
            "id":result.rows[0].idestado
        }
        return res.status(201).json(msg)
    }
    catch(error){
        return res.status(400).json(error)
    }
})

router.delete("/",async(req,res)=>{
    try{
        if(req.query.idestado === null || req.query.idestado === undefined){
            throw {
                "msg":"Informe todos os campos"
            }
        }
        await estadoController.desativarEstado(req.query.idestado)
        let msg = {
            "msg": "Deletado"
        }

        return res.status(200).json(msg)
    }
    catch(error){
        return res.status(400).json(error)
    }
})

router.put("/",async(req,res)=>{
    try{
        if(req.body.nomeestado === null || req.body.nomeestado === undefined ||
           req.body.ufestado   === null || req.body.ufestado   === undefined ||
           req.body.idestado   === null || req.body.idestado   === undefined ){
            throw {
                "msg":"Informe todos os campos"
            }
        }
        await estadoController.alterarEstado(req.body.nomeestado,
                                             req.body.ufestado,
                                             req.body.idestado)
        let msg = {
            "msg": "Alterado"
        }
        return res.status(200).json(msg)
    }
    catch(error){
        return res.status(400).json(error)
    }
})

router.get("/",async(req,res)=>{
    try{    
        if(req.query.idestado        === undefined ||
           req.query.nomeestado      === undefined ||
           req.query.ufestado        === undefined ||
           req.query.offset          === undefined ||
           req.query.orderby         === undefined ||
           req.query.ordenacaoCresc  === undefined ||
           req.query.limit           === undefined ||
           req.query.ativo           === null      || 
           req.query.ativo           === undefined ){
            throw {
                "msg":"Informe todos os campos"
            }
        }
        let result = await estadoController.consultarEstadoPaginacao(req.query.idestado,
                                                                     req.query.nomeestado,
                                                                     req.query.ufestado,
                                                                     req.query.ativo,
                                                                     req.query.orderby,
                                                                     req.query.offset,
                                                                     req.query.limit,
                                                                     req.query.ordenacaoCresc)

        let resultCount = await estadoController.contarConsultarEstado(req.query.idestado,
                                                                       req.query.nomeestado,
                                                                       req.query.ufestado,
                                                                       req.query.ativo)
        

        let list = []
        for (let i in result.rows){
            list.push({
                "id":result.rows[i].idestado,
                "nome":result.rows[i].nomeestado,
                "ufestado":result.rows[i].ufestado
            })
        }

        if(result.rowCount<parseInt(req.query.limit)){
            for(let i=result.rowCount;i<parseInt(req.query.limit);i++){
                list.push({
                    "id":null,
                    "nome":"",
                    "ufestado":""
                })
            }
        }

        let msg = {
            "msg":"Ok",
            "count":resultCount.rows[0].count,
            "data":list
        }

        return res.status(200).json(msg)
    }
    catch(error){
        return res.status(400).json(error)
    }
})


router.get("/tudo",async(req,res)=>{
    try{
        let result = await estadoController.consultarEstado(null,
                                                            null,
                                                            null,
                                                            true)
        

        let list = []
        for (let i in result.rows){
            list.push({
                "id":result.rows[i].idestado,
                "nome":result.rows[i].nomeestado,
                "uf":result.rows[i].uf
            })
        }

        let msg = {
            "msg":"Ok",
            "data":list
        }
        return res.status(200).json(msg)
    }
    catch(error){
        return res.status(400).json(error)
    }
})

module.exports=router