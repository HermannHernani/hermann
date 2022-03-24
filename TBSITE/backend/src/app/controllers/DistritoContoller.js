import Unity from '../models/Unidade'

class DistritoController{
    async showNorte(req,res){
        const total= await Unity.findAll({where:{unidade_distrito: 'NORTE'}})
        const ativos = await Unity.findAll({where:{unidade_distrito: 'NORTE', unidade_ativo: true}})
        const inativos = await Unity.findAll({where:{ unidade_distrito: 'NORTE',  unidade_ativo: false}})
        return res.json({norte: {total, ativos, inativos}})
    }

    async showLeste(req,res){
        const total= await Unity.findAll({where:{unidade_distrito: 'LESTE'}})
        const ativos = await Unity.findAll({where:{unidade_distrito: 'LESTE', unidade_ativo: true}})
        const inativos = await Unity.findAll({where:{ unidade_distrito: 'LESTE',  unidade_ativo: false}})
        return res.json({leste: {total, ativos, inativos}})
    }

    async showOeste(req,res){
        const total= await Unity.findAll({where:{unidade_distrito: 'OESTE'}})
        const ativos = await Unity.findAll({where:{unidade_distrito: 'OESTE', unidade_ativo: true}})
        const inativos = await Unity.findAll({where:{ unidade_distrito: 'OESTE',  unidade_ativo: false}})
        return res.json({oeste: {total, ativos, inativos}})
    }

    async showSul(req,res){
        const total= await Unity.findAll({where:{unidade_distrito: 'SUL'}})
        const ativos = await Unity.findAll({where:{unidade_distrito: 'SUL', unidade_ativo: true}})
        const inativos = await Unity.findAll({where:{ unidade_distrito: 'SUL',  unidade_ativo: false}})
        return res.json({sul: {total, ativos, inativos}})
    }


    async showRural(req,res){
        const total= await Unity.findAll({where:{unidade_distrito: 'RURAL'}})
        const ativos = await Unity.findAll({where:{unidade_distrito: 'RURAL', unidade_ativo: true}})
        const inativos = await Unity.findAll({where:{ unidade_distrito: 'RURAL',  unidade_ativo: false}})
        return res.json({rural: {total, ativos, inativos}})
    }
    
}
export default new DistritoController()