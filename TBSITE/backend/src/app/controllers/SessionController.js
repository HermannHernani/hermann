import jwt from 'jsonwebtoken'
import auth from '../../config/auth'
import User from '../models/Profissional'
import File from '../models/File'
import Cargo from '../models/Cargo'
import Designacao from '../models/Designacao'
import Permissao from '../models/Permissao'
import * as Yup from 'yup'
import dbConfig from '../../config/database'

var Sequelize = require('sequelize');
var sequelize = new Sequelize(dbConfig);

class SessionController{
    async store(req,res){
        const schema= Yup.object().shape({
            profissional_cpf:Yup.string().required().max(12),
            password:Yup.string().required().max(15)
        })
        if(!(await schema.isValid(req.body))){
            return res.status(401).json({error:"Schema is not valid"})
        }
        const {profissional_cpf,password}=req.body
        const userExist= await User.findOne({where:{
            profissional_cpf},
         })

        if(!userExist){
            return res.status(404).json({error:"User not found"})
        }
        if(!(await userExist.checkPassword(password))){
            return res.status(401).json({error:"Password does not match"})
        }
        const{profissional_id, profissional_nome}=userExist

        const {cargo_id} = await Designacao.findOne({
            where:{
                profissional_id:profissional_id,
                designacao_ativo: true
            }
        })
        

        const permissoes = await Permissao.findAll({
            where: 
            {
                cargo_id
            }
        })

        var cont = 0

        const unidadesRaw = await sequelize.query("SELECT lot.profissional_id AS profissional_id, lot.unidade_id AS unidade_id, unidade.unidade_nome AS unidade_nome FROM db_lotacao AS lot INNER JOIN db_unidade AS unidade ON unidade.unidade_id = lot.unidade_id WHERE lot.lotacao_ativo AND lot.profissional_id = " + profissional_id +";", { type: Sequelize.QueryTypes.SELECT });

        var unidade1 = {}
        var unidade2 = {}

        unidadesRaw.map((p)=>{
            var unidade = {
                unidade_id: p.unidade_id,
                profissional_id: p.profissional_id,
                unidade_nome: p.unidade_nome,
            }

            if(cont==0){
                unidade1 = unidade;
            }else{
                unidade2 = unidade;
            }
            cont ++;
        })

        console.log(unidade1)

        return res.json({
            userExist,token: jwt.sign({profissional_id},auth.secret,{
                expiresIn:auth.expiresIn
            }),
            profissional_id,
            profissional_nome,
            permissoes,
            cargo_id,
            unidade1,
            unidade2
        })
    }

}
export default new SessionController()