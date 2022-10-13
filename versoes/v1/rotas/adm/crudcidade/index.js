require('dotenv').config();
const express = require('express')
const router = express.Router()
const cidadeController = require("../../../models/cidade/controller")

router.post("/",async(req,res)=>{
    try{
        if(req.body.idestado   === null || req.body.idestado   === undefined ||
           req.body.nomecidade === null || req.body.nomecidade === undefined ||
           req.body.idibge     === null || req.body.idibge     === undefined){
            throw {
                "msg":"Informe todos os campos"
            }
        }
        let result = await cidadeController.criarCidade(req.body.idestado,
                                                        req.body.nomecidade,
                                                        req.body.idibge)
        let msg = {
            "msg":"Criado",
            "id":result.rows[0].idcidade
        }
        return res.status(201).json(msg)
    }
    catch(error){
        return res.status(400).json(error)
    }
})

router.delete("/",async(req,res)=>{
    try{
        if(req.query.idcidade === null || req.query.idcidade === undefined){
            throw {
                "msg":"Informe todos os campos"
            }
        }
        await cidadeController.desativarCidade(req.query.idcidade)
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
        if(req.body.idestado   === null || req.body.idestado   === undefined ||
           req.body.nomecidade === null || req.body.nomecidade === undefined ||
           req.body.idibge     === null || req.body.idibge     === undefined ||
           req.body.idcidade   === null || req.body.idcidade   === undefined ){
             throw {
                 "msg":"Informe todos os campos"
             }
         }
        await cidadeController.alterarCidade(req.body.idestado,
                                             req.body.nomecidade,
                                             req.body.idibge,
                                             req.body.idcidade)
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
        if(req.query.idcidade        === undefined ||
           req.query.idestado        === undefined ||
           req.query.nomecidade      === undefined ||
           req.query.idibge          === undefined ||
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
        let result = await cidadeController.consultarCidadePaginacao(req.query.idcidade,
                                                                     req.query.idestado,
                                                                     req.query.nomecidade,
                                                                     req.query.idibge,
                                                                     req.query.ativo,
                                                                     req.query.orderby,
                                                                     req.query.offset,
                                                                     req.query.limit,
                                                                     req.query.ordenacaoCresc)

        let resultCount = await cidadeController.contarConsultarCidade(req.query.idcidade,
                                                                       req.query.idestado,
                                                                       req.query.nomecidade,
                                                                       req.query.idibge,
                                                                       req.query.ativo)
        

        let list = []
        for (let i in result.rows){
            list.push({
                "id":result.rows[i].idcidade,
                "nome":result.rows[i].nomecidade,
                "idestado":result.rows[i].idestado,
                "nomeestado":result.rows[i].nomeestado,
                "ufestado":result.rows[i].ufestado,
                "idibge":result.rows[i].idigbe
            })
        }

        if(result.rowCount<parseInt(req.query.limit)){
            for(let i=result.rowCount;i<parseInt(req.query.limit);i++){
                list.push({
                    "id":null,
                    "nome":"",
                    "idestado":null,
                    "nomeestado":null,
                    "ufestado":null,
                    "idibge":null
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
        let result = await cidadeController.consultarCidade(null,
                                                            null,
                                                            null,
                                                            null,
                                                            true)
        

        let list = []
        for (let i in result.rows){
            list.push({
                "id":result.rows[i].idcidade,
                "nome":result.rows[i].nomecidade,
                "idestado":result.rows[i].idestado,
                "nomeestado":result.rows[i].nomeestado,
                "ufestado":result.rows[i].ufestado,
                "idibge":result.rows[i].idigbe
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