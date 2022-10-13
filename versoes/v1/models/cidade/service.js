require('dotenv').config();
const {Pool}=require('pg')
const connectionString = process.env.CONSTRING
const pool = new Pool({
    connectionString: connectionString
})

const consultarCidade = async(idcidade,
                              idestado,
                              nomecidade,
                              idigbe,
                              ativo)=>{
    const conexao = await pool.connect()                              
    try{
        await conexao.query('BEGIN')
        let values = [idcidade,idestado,nomecidade,idigbe,ativo]
        let query = `select c.*,
                            e.nomeestado,
                            e.ufestado 
                    from cidade as c
                    inner join estado e on c.idestado = e.idestado 
                    where (c.idcidade  = $1 or $1 is null)
                    and (c.idestado  = $2 or $2 is null)
                    and (c.nomecidade  ilike '%'||$3||'%' or $3 is null)
                    and (c.idigbe = $4 or $4 is null)
                    and c.ativo = $5`
        let result = await conexao.query(query, values)
        await conexao.query('COMMIT')
        return result
    }
    catch(erro){
        console.log(erro)
        await conexao.query('ROLLBACK')
        throw erro
    }
    finally{
          conexao.release()
    }
}

const consultarCidadeExato = async(idcidade,
                              idestado,
                              nomecidade,
                              idigbe,
                              ativo)=>{
    const conexao = await pool.connect()                              
    try{
        await conexao.query('BEGIN')
        let values = [idcidade,idestado,nomecidade,idigbe,ativo]
        let query = `select c.*,
                            e.nomeestado,
                            e.ufestado 
                    from cidade as c
                    inner join estado e on c.idestado = e.idestado 
                    where (c.idcidade  = $1 or $1 is null)
                    and (c.idestado  = $2 or $2 is null)
                    and (c.nomecidade  = $3 or $3 is null)
                    and (c.idigbe = $4 or $4 is null)
                    and c.ativo = $5`
        let result = await conexao.query(query, values)
        await conexao.query('COMMIT')
        return result
    }
    catch(erro){
        console.log(erro)
        await conexao.query('ROLLBACK')
        throw erro
    }
    finally{
          conexao.release()
    }
}

const contarConsultarCidade = async(idcidade,
                                    idestado,
                                    nomecidade,
                                    idigbe,
                                    ativo)=>{
    const conexao = await pool.connect()                              
    try{
        await conexao.query('BEGIN')
        let values = [idcidade,idestado,nomecidade,idigbe,ativo]
        let query = `select count(1)
                    from cidade as c
                    inner join estado e on c.idestado = e.idestado 
                    where (c.idcidade  = $1 or $1 is null)
                    and (c.idestado  = $2 or $2 is null)
                    and (c.nomecidade ilike '%'||$3||'%' or $3 is null)
                    and (c.idigbe = $4 or $4 is null)
                    and c.ativo = $5`
        let result = await conexao.query(query, values)
        await conexao.query('COMMIT')
        return result
    }
    catch(erro){
        console.log(erro)
        await conexao.query('ROLLBACK')
        throw erro
    }
    finally{
          conexao.release()
    }
}

const consultarCidadePaginacaoDesc = async(idcidade,
                                            idestado,
                                            nomecidade,
                                            idigbe,
                                            ativo,
                                            orderby,
                                            offset,
                                            limit)=>{
    const conexao = await pool.connect()                              
    try{
        await conexao.query('BEGIN')
        let values = [idcidade,idestado,nomecidade,idigbe,ativo,offset,limit]
        let query = `select c.*,
                            e.nomeestado,
                            e.ufestado 
                       from cidade as c
                      inner join estado e on c.idestado = e.idestado 
                      where (c.idcidade  = $1 or $1 is null)
                        and (c.idestado  = $2 or $2 is null)
                        and (c.nomecidade ilike '%'||$3||'%' or $3 is null)
                        and (c.idigbe = $4 or $4 is null)
                        and c.ativo = $5
                       order by ${orderby} desc
                      offset $6
                       limit $7`
        let result = await conexao.query(query, values)
        await conexao.query('COMMIT')
        return result
    }
    catch(erro){
        console.log(erro)
        await conexao.query('ROLLBACK')
        throw erro
    }
    finally{
          conexao.release()
    }
}

const consultarCidadePaginacaoCres = async(idcidade,
                                            idestado,
                                            nomecidade,
                                            idigbe,
                                            ativo,
                                            orderby,
                                            offset,
                                            limit)=>{
    const conexao = await pool.connect()                              
    try{
        await conexao.query('BEGIN')
        let values = [idcidade,idestado,nomecidade,idigbe,ativo,offset,limit]
        let query = `select c.*,
                            e.nomeestado,
                            e.ufestado 
                       from cidade as c
                      inner join estado e on c.idestado = e.idestado 
                      where (c.idcidade  = $1 or $1 is null)
                        and (c.idestado  = $2 or $2 is null)
                        and (c.nomecidade ilike '%'||$3||'%' or $3 is null)
                        and (c.idigbe = $4 or $4 is null)
                        and c.ativo = $5
                      order by ${orderby}
                     offset $6
                      limit $7`
        let result = await conexao.query(query, values)
        await conexao.query('COMMIT')
        return result
    }
    catch(erro){
        console.log(erro)
        await conexao.query('ROLLBACK')
        throw erro
    }
    finally{
          conexao.release()
    }
}


const criarCidade = async(idestado,
                          nomecidade,
                          idigbe)=>{
    const conexao = await pool.connect()                              
    try{
        await conexao.query('BEGIN') 
        let values = [idestado,nomecidade,idigbe]
        let query = `insert into cidade (idestado,nomecidade,idigbe)
                                 values ($1,$2,$3)
                              returning idcidade`
        let result = await conexao.query(query, values)
        await conexao.query('COMMIT') 
        return result
    }
    catch(erro){
        console.log(erro)
        await conexao.query('ROLLBACK')
        throw erro
    }
    finally{
          conexao.release()
    }
}

const desativarCidade = async(idcidade)=>{
    const conexao = await pool.connect()                              
    try{
        await conexao.query('BEGIN') 
        let values = [idcidade]
        let query = `update cidade 
                        set ativo = false
                      where idcidade = $1`
        await conexao.query(query, values)
        await conexao.query('COMMIT') 
        return true
    }
    catch(erro){
        console.log(erro)
        await conexao.query('ROLLBACK')
        throw erro
    }
    finally{
          conexao.release()
    }
}

const alterarCidade = async(idestado,
                            nomecidade,
                            idigbe,
                            idcidade)=>{
    const conexao = await pool.connect()                              
    try{
        await conexao.query('BEGIN') 
        let values = [idestado,nomecidade,idigbe,idcidade]
        let query = `update cidade
                       set idestado = $1,
                           nomecidade = $2,
                           idigbe = $3
                     where idcidade = $4`
        await conexao.query(query, values)
        await conexao.query('COMMIT') 
        return true
    }
    catch(erro){
        console.log(erro)
        await conexao.query('ROLLBACK')
        throw erro
    }
    finally{
          conexao.release()
    }
}


module.exports={
    consultarCidade,
    criarCidade,
    desativarCidade,
    alterarCidade,
    contarConsultarCidade,
    consultarCidadePaginacaoDesc,
    consultarCidadePaginacaoCres,
    consultarCidadeExato
}