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
        let query = `select * 
                        from cidade
                       where (idcidade = $1 or $1 is null)
                         and (idestado = $2 or $2 is null)
                         and (nomecidade ilike '%'||$3||'%' or $3 is null)
                         and (idigbe = $4 or $4 is null)
                         and ativo = $5`
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
        let query = `select * 
                        from cidade
                       where (idcidade = $1 or $1 is null)
                         and (idestado = $2 or $2 is null)
                         and (nomecidade = $3 or $3 is null)
                         and (idigbe = $4 or $4 is null)
                         and ativo = $5`
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
    consultarCidadeExato
}