const service = require('./service')
const controllerEstado = require('../estado/controller')

const consultarChavesSec = async(nomecidade) =>{
    try{
        let result = await service.consultarCidadeExato(null,
                                                        null,
                                                        nomecidade,
                                                        null,
                                                        true)
        return result
    }
    catch(error){
        throw error
    }
}

const consultarChave = async(idcidade) =>{
    try{
        let result = await service.consultarCidade(idcidade,
                                                   null,
                                                   null,
                                                   null,
                                                   true)
        return result
    }
    catch(error){
        throw error   
    }
}

const consultarCidade = async(idcidade,
                                idestado,
                                nomecidade,
                                idigbe,
                                ativo)=>{                          
    try{
        return await service.consultarCidade(idcidade,
                                            idestado,
                                            nomecidade,
                                            idigbe,
                                            ativo)
    }
    catch(erro){
        console.log(erro)
        throw erro
    }
}

const contarConsultarCidade = async(idcidade,
                                    idestado,
                                    nomecidade,
                                    idigbe,
                                    ativo)=>{                          
    try{
        return await service.contarConsultarCidade(idcidade,
                                                    idestado,
                                                    nomecidade,
                                                    idigbe,
                                                    ativo)
    }
    catch(erro){
        console.log(erro)
        throw erro
    }
}

const consultarCidadePaginacao = async(idcidade,
                                        idestado,
                                        nomecidade,
                                        idigbe,
                                        ativo,
                                        orderby,
                                        offset,
                                        limit,
                                        ordenacaoCresc)=>{
    try{
        if(ordenacaoCresc==='true'){
            return await service.consultarCidadePaginacaoCres(idcidade,
                                                                idestado,
                                                                nomecidade,
                                                                idigbe,
                                                                ativo,
                                                                orderby,
                                                                offset,
                                                                limit)
        }
        else{
            return await service.consultarCidadePaginacaoDesc(idcidade,
                                                                idestado,
                                                                nomecidade,
                                                                idigbe,
                                                                ativo,
                                                                orderby,
                                                                offset,
                                                                limit)
        }

    }catch(erro){
        console.log(erro)
        throw erro
    }
}

const consultarCidadeExato = async(idcidade,
                                    idestado,
                                    nomecidade,
                                    idibge,
                                    ativo)=>{
    try{
        return await service.consultarCidadeExato(idcidade,
                                                  idestado,
                                                  nomecidade,
                                                  idibge,
                                                  ativo)
    }
    catch(erro){
        console.log(erro)
        throw erro
    }
}

const criarCidade = async(idestado,
                          nomecidade,
                          idibge)=>{
    try{
        let result = await consultarChavesSec(nomecidade)
        if(result.rowCount>0){
            throw{
                "msg":"Cidade já existe"
            }
        }

        result = await controllerEstado.consultarChave(idestado)

        if(result.rowCount<=0){
            throw{
                "msg":"Estado não existe"
            }
        }

        return await service.criarCidade(idestado,
                                         nomecidade,
                                         idibge)
    }
    catch(error){
        console.log(error)
        throw error
    }
}

const desativarCidade = async(idcidade)=>{                         
    try{
        let result= await consultarChave(idcidade)
        if(result.rowCount<=0){
            throw {
                "msg":"Id da cidade não existe"
            }
        }
        return await service.desativarCidade(idcidade)
    }
    catch(erro){
        console.log(erro)
        throw erro
    }
}

const alterarCidade = async(idestado,
                            nomecidade,
                            idibge,
                            idcidade)=>{                         
    try{
        let result= await consultarChave(idcidade)
        if(result.rowCount<=0){
            throw {
                "msg":"Id da cidade não existe"
            }
        }
        return await service.alterarCidade(idestado,
                                           nomecidade,
                                           idibge,
                                           idcidade)
    }
    catch(erro){
        console.log(erro)
        throw erro
    }
}


module.exports={
    consultarCidade,
    consultarCidadePaginacao,
    criarCidade,
    desativarCidade,
    alterarCidade,
    consultarCidadeExato,
    consultarChavesSec,
    consultarChave,
    contarConsultarCidade
}