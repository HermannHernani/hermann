import Paciente from '../models/Paciente'

class PacienteController{
    async show(req,res){
        const paciente= await Paciente.findAll()
        return res.json({paciente})
    }
}

export default PacienteController()