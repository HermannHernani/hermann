import User from '../models/Profissional'
import File from '../models/File'
import Cargo from '../models/Cargo'
import Designacao from '../models/Designacao'
import Lotacao from '../models/Lotacao'
import Permissao from '../models/Permissao'
import * as Yup from 'yup'
import Vinculacao from '../models/Vinculacao'
import Unidade from '../models/Unidade'
import dbConfig from '../../config/database'

var Sequelize = require('sequelize');
var sequelize = new Sequelize(dbConfig);

class UserController{
    async store(req,res){
        const schema=Yup.object().shape({
            profissional_nome:Yup.string().required(),
            profissional_email:Yup.string().required(),
            profissional_senha:Yup.string().required().max(15),
            profissional_cpf:Yup.string().required().max(12),
            profissional_telefone:Yup.string().required(),  
            profissional_cns:Yup.string().required(),
            profissional_ativo:Yup.bool().required(),
            unidade_1_id:Yup.number().required().min(0),
            unidade_2_id:Yup.number().required(),
            cargo_id:Yup.number().required().min(0)
        })
        if(!(await schema.isValid(req.body))){
            return res.status(401).json({error:"Not valid data"})
        }
        const {profissional_email,profissional_cpf} = req.body
        const userExist= await User.findOne({where:{
            profissional_cpf
        }})

        if(userExist){
            return res.status(401).json({error:"User already registred"})
        }

        const profissional_arq = {
            profissional_nome: req.body.profissional_nome,
            profissional_email: req.body.profissional_email,
            profissional_senha: req.body.profissional_senha,
            profissional_cpf: req.body.profissional_cpf,
            profissional_telefone: req.body.profissional_telefone,  
            profissional_cns: req.body.profissional_cns,
            profissional_ativo: req.body.profissional_ativo
        }

        //const {profissional_nome} = await User.cadastrar(req.body)
        var t1 = await sequelize.transaction().then(t =>{
            return User.create(profissional_arq, {
                transaction:t
            }).then(() => {
                return t.commit();
            }).catch((err) =>{
                return t.roolback();    
            })
        })

        const user = await sequelize.query("SELECT * FROM db_profissional WHERE profissional_cpf = '" + profissional_cpf +"';", { type: Sequelize.QueryTypes.SELECT });

        const lotacao_1 = {
            unidade_id: req.body.unidade_1_id,
            profissional_id: user[0].profissional_id,
            lotacao_inicio: new Date(),
            lotacao_fim: null,
            lotacao_ativo: true
        }

        const designacao = {
            cargo_id: req.body.cargo_id,
            profissional_id: user[0].profissional_id,
            designacao_inicio: new Date(),
            designacao_fim: null,
            designacao_ativo: true
        }

        sequelize.transaction().then(t =>{
            return Lotacao.create(lotacao_1, {
                transaction:t
            }).then(() => {
                return t.commit();
            }).catch((err) =>{
                return t.roolback();    
            })
        })

        sequelize.transaction().then(t =>{
            return Designacao.create(designacao, {
                transaction:t
            }).then(() => {
                return t.commit();
            }).catch((err) =>{
                return t.roolback();    
            })
        })

        if(req.body.unidade_2_id != -1)
        {
            const lotacao_2 = {
                unidade_id: req.body.unidade_2_id,
                profissional_id: user[0].profissional_id,
                lotacao_inicio: new Date(),
                lotacao_fim: null,
                lotacao_ativo: true
            }

            sequelize.transaction().then(t =>{
                return Lotacao.create(lotacao_2, {
                    transaction:t
                }).then(() => {
                    return t.commit();
                }).catch((err) =>{
                    return t.roolback();    
                })
            })
        }
    
        return res.json({
            //profissional_nome,
            profissional_email,
            //professional_type,
        })
    }
    async index(req,res){

        const {profissional_id,profissional_nome,profissional_email,profissional_cpf,profissional_telefone}= await User.findByPk(req.params.id)

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

        var lista = []
        permissoes.forEach((e,i,array)=>{
            lista.push(e.acesso_id);
        })

        return res.json({
            profissional_id,
            profissional_nome,
            profissional_cpf,
            profissional_telefone,
            profissional_email,
            lista
        });
    }
    async update(req,res){

        console.log(req.body)
        var senha = "";

        const user_body = {
            nome: req.body.nome,
            email: req.body.email,
            senhaOld: req.body.senhaOld,
            senha: req.body.senha,
            confirmaSenha: req.body.confirmaSenha,
            telefone: req.body.telefone
        }

        const unity_1_body = {
            unidade_1_id: req.body.unidade_id_1,
            unidade_1_id_old: req.body.unidade_id_1_old,
        }

        const unity_2_body = {
            unidade_2_id: req.body.unidade_id_2,
            unidade_2_id_old: req.body.unidade_id_2_old,
        }

        const {email,senhaOld} =req.body
        const user= await User.findByPk(req.params.id)
        if(email && email !== user.profissional_email){
            const userExists= await User.findOne({where:{profissional_email:email}})
            if(userExists){
                return res.status(400).json({error:'User already exist'})
            }
        }
        if(senhaOld && !(await user.checkPassword(senhaOld))){
             return res.status(401).json({error:'Password does not mach'})
        }

        if(user_body.senhaOld == null || user_body.senhaOld == ""){
            senha = user.profissional_senha
        }

        if (senha != user_body.senha && user_body.senha != null && user_body.senha != ""){
            senha = user_body.senha
        }

        const up1 = await sequelize.query("UPDATE db_profissional SET profissional_nome = '" + user_body.nome + "', profissional_senha = '" + senha + "', profissional_telefone = '" + user_body.telefone + "', profissional_email = '" + user_body.email + "' WHERE profissional_id = '" + req.params.id +"';", { type: Sequelize.QueryTypes.UPDATE });
        if(unity_1_body.unidade_1_id != unity_1_body.unidade_1_id_old){

            var dateFim = new Date().toISOString()
            dateFim = dateFim.replace(/T/g, ' ');
            dateFim = dateFim.replace(/Z/g, '');
            const up2 = await sequelize.query("UPDATE db_lotacao SET lotacao_fim = '" + dateFim + "', lotacao_ativo = false WHERE profissional_id = " + req.params.id +" AND unidade_id = '" + unity_1_body.unidade_1_id_old + "' AND lotacao_ativo = true;", { type: Sequelize.QueryTypes.UPDATE });
            
            const lotacao_nova_1 = {
                unidade_id: unity_1_body.unidade_1_id,
                profissional_id: req.params.id,
                lotacao_inicio: new Date(),
                lotacao_fim: null,
                lotacao_ativo: true
            }
            
            sequelize.transaction().then(t =>{
                return Lotacao.create(lotacao_nova_1, {
                    transaction:t
                }).then(() => {
                    return t.commit();
                }).catch((err) =>{
                    return t.roolback();    
                })
            })
        }

        if(unity_2_body.unidade_2_id != unity_2_body.unidade_2_id_old){
            var dateFim = new Date().toISOString()
            dateFim = dateFim.replace(/T/g, ' ');
            dateFim = dateFim.replace(/Z/g, '');
            const up3 = await sequelize.query("UPDATE db_lotacao SET lotacao_fim = '" + dateFim + "', lotacao_ativo = false WHERE profissional_id = " + req.params.id +" AND unidade_id = '" + unity_2_body.unidade_2_id_old + "' AND lotacao_ativo = true;", { type: Sequelize.QueryTypes.UPDATE });
            
            const lotacao_nova_2 = {
                unidade_id: unity_2_body.unidade_2_id,
                profissional_id: req.params.id,
                lotacao_inicio: new Date(),
                lotacao_fim: null,
                lotacao_ativo: true
            }
            
            sequelize.transaction().then(t =>{
                return Lotacao.create(lotacao_nova_2, {
                    transaction:t
                }).then(() => {
                    return t.commit();
                }).catch((err) =>{
                    return t.roolback();    
                })
            })
        }

        return res.json({
          reponse: "OK"
        });
    }

}
export default new UserController()