import {Model,Sequelize} from 'sequelize'
import bcrypt from 'bcryptjs'
import Vinculacao from './Vinculacao'

class Paciente extends Model{
    static init(sequelize){
        super.init({
            paciente_id: {
                primaryKey: true,
                type: Sequelize.STRING,
                allowNull: false
            },
            paciente_cpf: {
                type: Sequelize.STRING,
                allowNull: false
            },
            paciente_nome: {
                type: Sequelize.STRING,
                allowNull: false
            },
            paciente_telefone:{
                type: Sequelize.STRING,
                allowNull: true
            },
            paciente_cep: {
                type:Sequelize.STRING,
                allowNull: true
            },
            paciente_endereco: {
                type: Sequelize.STRING,
                allowNull: false
            },
            paciente_nome_mae: {
                type: Sequelize.STRING,
                allowNull: false
            },
            paciente_sexo: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            paciente_altura: {
                type: Sequelize.STRING,
                allowNull: true
            },
            paciente_peso: {
                type: Sequelize.STRING,
                allowNull: false
            },
            paciente_email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            paciente_senha: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            paciente_horario_medicacao: {
                type: Sequelize.STRING,
                allowNull: true
            },
            paciente_resetPasswordToken: {
                type: Sequelize.STRING,
                allowNull: true,
                field: "paciente_resetPasswordToken"
            },
            paciente_data_inicio: {
                type: Sequelize.DATE,
                allowNull: true
            },
            paciente_data_fim: {
                type: Sequelize.DATE,
                allowNull: true
            },
            paciente_resetPasswordExpires: {
                type: Sequelize.DATE,
                allowNull: true,
                field: "paciente_resetPasswordExpires"
            }

        },{
            sequelize,
            modelName: 'db_paciente',
            freezeTableName: true,
            timestamps: false
        })
        this.addHook('beforeSave',async (user)=>{
            if(user.password){
                user.password_hash= await bcrypt.hash(user.password,8)
            }
        })
        this.addHook('beforeSave',async (user)=>{
            if(user.unity_id === user.unity2_id){
                console.log('Nao foi possivel vincular usuário')
            }
        })
        return this
    }
    checkPassword(password){
        return password == this.paciente_senha;
    }
}
export default Paciente