import Vinculacao from '../models/Vinculacao'

class VinculacaoController{
    async index(req,res){
        const {paciente_id}=req.params
        const vinculacao = await Vinculacao.findOne({where:{ paciente_id}})
        return res.json({
           vinculacao:{
               vinculacao
           }
        })
    }
    async show(req,res){
        const total= await Vinculacao.findAll({where:{unidade_id: req.params.id}})
        const ativos = await Vinculacao.findAll({where:{ unidade_id: req.params.id, vinculacao_ativo: true}})
        const inativos = await Vinculacao.findAll({where:{ unidade_id: req.params.id, vinculacao_ativo: false}})
        return res.json({vinculacao:{
            total,
            ativos,
            inativos
        }})
    }
    async ativos(req, res){
        const ativos = await Vinculacao.findAll({where:{ unidade_id: (req.params.id).parseInt(), vinculacao_ativo: true}})
        return res.json({ativos})
    }
    async inativos(req, res){
        const inativos = await Vinculacao.findAll({where:{ unidade_id: (req.params.id).parseInt(), vinculacao_ativo: false}})
        return res.json({inativos})
    }
    
}

export default new VinculacaoController()