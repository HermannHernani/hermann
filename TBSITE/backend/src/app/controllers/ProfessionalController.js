import dbConfig from '../../config/database'
import { Sequelize } from 'sequelize';

var Sequelize = require('sequelize');
var sequelize = new Sequelize(dbConfig);

class ProfissionalController{
    async show(req,res){
        const profissionalRaw = await sequelize.query("SELECT profissional_id as id, profissional_nome as nome, profissional_cns as cns, profissional_ativo as status, profissional_telefone as telefone, profissional_email as email, profissional_cpf as cpf from db_profissional", { type: Sequelize.QueryTypes.SELECT })
        var profissionais = []
        profissionalRaw.map((p)=>{
             var profissional = {
                 profissional_id: p.id,
                 profissional_nome: p.nome,
                 profissional_cpf: p.cpf,
                 profissional_cns: p.cns,
                 profissional_ativo: (p.status == true? "ATIVO": "INATIVO"), 
                 profissional_telefone: p.telefone,
                 profissional_email: p.email
             } 
             profissionais.push(profissional)

         
    })
        return res.json({profissionais})
    }
}

export default new ProfissionalController()