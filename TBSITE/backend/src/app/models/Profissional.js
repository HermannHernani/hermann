import {Model,Sequelize} from 'sequelize'
import bcrypt from 'bcryptjs'

class Profissional extends Model{
    static init(sequelize){
        super.init({
            profissional_id: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false
            },
            profissional_nome:{
                type: Sequelize.STRING,
                allowNull: false
            },
            profissional_cns: {
                type: Sequelize.STRING,
                allowNull: false
            },
            profissional_ativo: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            profissional_senha: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            profissional_telefone:{
                type: Sequelize.STRING,
                allowNull: true
            },
            profissional_email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            profissional_cpf: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },{
            sequelize,
            modelName: 'db_profissional',
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
        return password == this.profissional_senha;
    }
}
export default Profissional