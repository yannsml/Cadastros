require('dotenv').config();
const {Pool}=require('pg')
const connectionString = process.env.CONSTRING
const pool = new Pool({
    connectionString: connectionString
})

const consultarEstado = async(idestado,
                              nomeestado,
                              ufestado,
                              ativo)=>{
    const conexao = await pool.connect()                              
    try{
        await conexao.query('BEGIN')
        let values = [idestado,nomeestado,ufestado,ativo]
        let query = `select * 
                        from estado
                       where (idestado = $1 or $1 is null)
                         and (nomeestado ilike '%'||$2||'%' or $2 is null)
                         and (ufestado = $3 or $3 is null)
                         and ativo = $4`
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

const contarConsultarEstado = async(idestado,
                                    nomeestado,
                                    ufestado,
                                    ativo)=>{
    const conexao = await pool.connect()                              
    try{
        await conexao.query('BEGIN')
        let values = [idestado,nomeestado,ufestado,ativo]
        let query = `select count(1)
                        from estado
                       where (idestado = $1 or $1 is null)
                         and (nomeestado ilike '%'||$2||'%' or $2 is null)
                         and (ufestado = $3 or $3 is null)
                         and ativo = $4`
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

const consultarEstadoPaginacaoDesc = async(idestado,
                                           nomeestado,
                                           ufestado,
                                           ativo,
                                           orderby,
                                           offset,
                                           limit)=>{
    const conexao = await pool.connect()                              
    try{
        await conexao.query('BEGIN')
        let values = [idestado,nomeestado,ufestado,ativo,offset,limit]
        let query = `select * 
                        from estado
                       where (idestado = $1 or $1 is null)
                         and (nomeestado ilike '%'||$2||'%' or $2 is null)
                         and (ufestado = $3 or $3 is null)
                         and ativo = $4
                       order by ${orderby} desc
                      offset $5\
                       limit $6`
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

const consultarEstadoPaginacaoCres = async(idestado,
                                           nomeestado,
                                           ufestado,
                                           ativo,
                                           orderby,
                                           offset,
                                           limit)=>{
    const conexao = await pool.connect()                              
    try{
        await conexao.query('BEGIN')
        let values = [idestado,nomeestado,ufestado,ativo,offset,limit]
        let query = `select * 
                        from estado
                       where (idestado = $1 or $1 is null)
                         and (nomeestado ilike '%'||$2||'%' or $2 is null)
                         and (ufestado = $3 or $3 is null)
                         and ativo = $4
                       order by ${orderby}
                      offset $5
                       limit $6`
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

const consultarEstadoExato = async(idestado,
                                   nomeestado,
                                   ufestado,
                                   ativo)=>{
    const conexao = await pool.connect()                              
    try{
        await conexao.query('BEGIN')
        let values = [idestado,nomeestado,ufestado,ativo]
        let query = `select * 
                        from estado
                       where (idestado = $1 or $1 is null)
                         and (nomeestado = $2 or $2 is null)
                         and (ufestado = $3 or $3 is null)
                         and ativo = $4`
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

const criarEstado = async(nomeestado,
                          ufestado)=>{
    const conexao = await pool.connect()                              
    try{
        await conexao.query('BEGIN') 
        let values = [nomeestado,ufestado]
        let query = `insert into estado (nomeestado,ufestado)
                                 values ($1,$2) 
                              returning idestado`
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

const desativarEstado = async(idestado)=>{
    const conexao = await pool.connect()                              
    try{
        await conexao.query('BEGIN') 
        let values = [idestado]
        let query = `update estado 
                        set ativo = false
                      where idestado = $1`
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

const alterarEstado = async(nomeestado,
                            ufestado,
                            idestado)=>{
    const conexao = await pool.connect()                              
    try{
        await conexao.query('BEGIN') 
        let values = [nomeestado,ufestado,idestado]
        let query = `update estado 
                       set nomeestado = $1,
                           ufestado = $2
                     where idestado = $3`
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
    consultarEstado,
    criarEstado,
    desativarEstado,
    alterarEstado,
    consultarEstadoExato,
    consultarEstadoPaginacaoCres,
    consultarEstadoPaginacaoDesc,
    contarConsultarEstado
}