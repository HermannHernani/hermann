import Sequelize from 'sequelize'
// import User from '../app/models/User'
// import Unity from '../app/models/Unity'
import File from '../app/models/File'
import Acesso from '../app/models/Acesso'
import Agenda from '../app/models/Agenda'
import Cargo from '../app/models/Cargo'
import Designacao from '../app/models/Designacao'
import Lotacao from '../app/models/Lotacao'
import Paciente from '../app/models/Paciente'
import Permissao from '../app/models/Permissao'
import Profissional from '../app/models/Profissional'
import Tratamento from '../app/models/Tratamento'
import Unidade from '../app/models/Unidade'
import Vinculacao from '../app/models/Vinculacao'
import dbConfig from '../config/database'

const models=[File,Acesso,Agenda,Cargo,Designacao,Lotacao,Paciente,Permissao,Profissional,Tratamento,Unidade,Vinculacao]

class Database{
    constructor(){
        this.init()
    }
    init(){
        this.connection=new Sequelize(dbConfig)
        models.map(model => model.init(this.connection))
        models.map(model=> model.associate && model.associate(this.connection.models))
    }
}

export default new Database