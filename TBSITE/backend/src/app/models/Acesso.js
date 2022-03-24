import {Model,Sequelize} from 'sequelize'

class Acesso extends Model{
    static init(sequelize){
        super.init({
            acesso_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            acesso_nome: {
                type: Sequelize.STRING,
                allowNull: false
            },
            acesso_ativo: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        },{
            sequelize,
            modelName: 'db_acesso'
        })
        return this
    }
}
export default Acesso