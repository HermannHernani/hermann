import Cargo from '../models/Cargo'
import User from '../models/Profissional'
import Designacao from '../models/Designacao'
import Lotacao from '../models/Lotacao'
import * as Yup from 'yup'

class CargoController{
    async show(req,res){
        const cargos = await Cargo.findAll()
        return res.json({cargos})
    }
    async store(req,res){
        const schema=Yup.object().shape({
            profissional_cpf:Yup.string().required().max(12),
            unidade_1_id:Yup.number().required().positive(),
            unidade_2_id:Yup.number().required(),
            cargo_id:Yup.number().required().positive()
        })

        if(!(await schema.isValid(req.body))){
            return res.status(401).json({error:"Not valid data"})
        }

        const {profissional_cpf} = req.body
        const {profissional_id} = await User.findOne({where:{
            profissional_cpf
        }})

        console.log(user)
        const lotacao_1 = {
            unidade_id: req.body.unidade_1_id,
            profissional_id: profissional_id,
            lotacao_inicio: new Date(),
            lotacao_ativo: true
        }

        const designacao = {
            cargo_id: req.body.cargo_id,
            profissional_id: profissional_id,
            designacao_inicio: new Date(),
            designacao_ativo: true
        }

        Lotacao.create(lotacao_1, {
        }).then(function() {
            Lotacao.commit();
        })

        Designacao.create(designacao, {
        }).then(function() {
            Designacao.commit();
        })

        if(req.body.unidade_2_id != -1)
        {
            const lotacao_2 = {
                unidade_id: req.body.unidade_2_id,
                profissional_id: profissional_id,
                lotacao_inicio: new Date(),
                lotacao_ativo: true
            }

            Lotacao.create(lotacao_2, {
            }).then(function() {
                Lotacao.commit();
            })
        }
        return res.json({
            profissional_id
        })
    }
}

export default new CargoController()