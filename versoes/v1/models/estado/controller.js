const service = require('./service')

const consultarChavesSec = async(nomeestado,
                                 ufestado) =>{
    try{
        let result = await service.consultarEstadoExato(null,
                                                        nomeestado,
                                                        ufestado,
                                                        true)
        return result
    }
    catch(error){
        throw error
    }
}

const consultarChave = async(idestado) =>{
    try{
        let result = await service.consultarEstadoExato(idestado,
                                                        null,
                                                        null,
                                                        true)
        return result
    }
    catch(error){
        throw error   
    }
}

const consultarEstado = async(idestado,
                              nomeestado,
                              ufestado,
                              ativo)=>{                          
    try{
        return await service.consultarEstado(idestado,
                                             nomeestado,
                                             ufestado,
                                             ativo)
    }
    catch(erro){
        console.log(erro)
        throw erro
    }
}

const contarConsultarEstado = async(idestado,
                                    nomeestado,
                                    ufestado,
                                    ativo)=>{                          
    try{
        return await service.contarConsultarEstado(idestado,
                                                   nomeestado,
                                                   ufestado,
                                                   ativo)
            }
    catch(erro){
        console.log(erro)
        throw erro
    }
}

const consultarEstadoPaginacao = async(idestado,
                                       nomeestado,
                                       ufestado,
                                       ativo,
                                       orderby,
                                       offset,
                                       limit,
                                       ordenacaoCresc)=>{                          
    try{
        if(ordenacaoCresc==='true'){
            return await service.consultarEstadoPaginacaoCres(idestado,
                                                              nomeestado,
                                                              ufestado,
                                                              ativo,
                                                              orderby,
                                                              offset,
                                                              limit)
        }
        else{
            return await service.consultarEstadoPaginacaoDesc(idestado,
                                                              nomeestado,
                                                              ufestado,
                                                              ativo,
                                                              orderby,
                                                              offset,
                                                              limit)
        }
        
    }
    catch(erro){
        console.log(erro)
        throw erro
    }
}

const consultarEstadoExato = async(idestado,
                                   nomeestado,
                                   ufestado,
                                   ativo)=>{
    try{
        return await service.consultarEstadoExato(idestado,
                                                  nomeestado,
                                                  ufestado,
                                                  ativo)
    }
    catch(erro){
        console.log(erro)
        throw erro
    }
}

const criarEstado = async(nomeestado,
                          ufestado)=>{
    try{
        let result = await consultarChavesSec(nomeestado,
                                              ufestado)
        if(result.rowCount>0){
            throw{
                "msg":"Estado j?? existe"
            }
        }
        return await service.criarEstado(nomeestado,
                                         ufestado)
    }
    catch(error){
        console.log(error)
        throw error
    }
}

const desativarEstado = async(idestado)=>{                         
    try{
        let result= await consultarChave(idestado)
        if(result.rowCount<=0){
            throw {
                "msg":"Id do estado n??o existe"
            }
        }
        return await service.desativarEstado(idestado)
    }
    catch(erro){
        console.log(erro)
        throw erro
    }
}

const alterarEstado = async(nomeestado,
                            ufestado,
                            idestado)=>{                         
    try{
        let result= await consultarChave(idestado)
        if(result.rowCount<=0){
            throw {
                "msg":"Id do estado n??o existe"
            }
        }
        return await service.alterarEstado(nomeestado,
                                           ufestado,
                                           idestado)
    }
    catch(erro){
        console.log(erro)
        throw erro
    }
}


module.exports={
    consultarEstado,
    criarEstado,
    desativarEstado,
    alterarEstado,
    consultarEstadoExato,
    consultarChavesSec,
    consultarChave,
    consultarEstadoPaginacao,
    contarConsultarEstado
}