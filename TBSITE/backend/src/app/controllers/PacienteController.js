import Paciente from '../models/Paciente'
import Vinculacao from '../models/Vinculacao'
import dbConfig from '../../config/database'

var Sequelize = require('sequelize');
var sequelize = new Sequelize(dbConfig);

class PacienteController{

    async store (req,res){
        const{originalname:name ,filename:path} = req.file
 
        const file= await File.create({
            name,
            path
        }) 
        return res.json(file)
    }
    async index(req,res){
        const{id,url,path}= await File.findOne({where:{
            id:req.params.id
        }})
        return res.json({
            id,
            url,
            path
        })
    }

    async index(req,res){
        const{id,url,path}= await File.findOne({where:{
            id:req.params.id
        }})
        return res.json({
            id,
            url,
            path
        })
    }

    async find(paciente_id){
        const paciente = await Paciente.findByPk(paciente_id)
        return paciente;
    }

    async show(req,res){
        const pacientesRaw = await sequelize.query("SELECT vinc.paciente_id, vinc.unidade_id, paciente.paciente_nome AS paciente_nome, paciente.paciente_cpf AS paciente_cpf, paciente.paciente_data_fim AS paciente_data_fim, paciente.paciente_data_inicio AS paciente_data_inicio FROM db_vinculacao AS vinc INNER JOIN db_paciente AS paciente ON paciente.paciente_id = vinc.paciente_id WHERE vinc.unidade_id = " + req.params.id +";", { type: Sequelize.QueryTypes.SELECT });
        var pacientes = []
        pacientesRaw.map((p)=>{
            var dataIni = new Date(p["paciente_data_inicio"])
            var paciente = {
                paciente_id: p.paciente_id,
                unidade_id: p.unidade_id,
                paciente_nome: p.paciente_nome,
                paciente_cpf: p.paciente_cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
                paciente_data_inicio: dataIni.getDate().toString() + "/" + (dataIni.getMonth() + 1 >= 10?(dataIni.getMonth() + 1).toString():("0"+(dataIni.getMonth() + 1).toString())) + "/" + dataIni.getFullYear().toString()
            }
            if(p.paciente_data_fim != null)
            {
                var dataFim = new Date(p.paciente_data_fim)
                paciente["paciente_data_fim"] = dataFim.getDate().toString() + "/" + (dataIni.getMonth() + 1 >= 10?(dataIni.getMonth() + 1).toString():("0"+(dataIni.getMonth() + 1).toString())) + "/" + dataFim.getFullYear().toString()
            }else{
                paciente["paciente_data_fim"] = "Não especificado"
            }
            pacientes.push(paciente);
        })
        console.log({pacientes})
        return res.json({pacientes})
    }
}

export default new PacienteController()