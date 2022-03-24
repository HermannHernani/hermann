import {Model,Sequelize} from 'sequelize'
import bcrypt from 'bcryptjs'
class User extends Model{
    static init(sequelize){
        super.init({
            name:Sequelize.STRING,
            email:Sequelize.STRING,
            password:Sequelize.VIRTUAL,
            password_hash:Sequelize.STRING,
            cpf:Sequelize.STRING,
            phone:Sequelize.STRING,
            professional_type:Sequelize.INTEGER

        },{
            sequelize
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
    }
    static associate(models){
        this.belongsTo(models.Unity,{foreignKey:'unity_id',as:'unitys'})
        this.belongsTo(models.Unity,{foreignKey:'unity2_id',as:'unitys2'})
        this.belongsTo(models.File,{foreignKey:'avatar_id',as:'avatar'})
    }
    checkPassword(password){
        return bcrypt.compare(password,this.password_hash)
    }
}
export default User