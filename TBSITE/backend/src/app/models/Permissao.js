import {Model,Sequelize} from 'sequelize'

class Permissao extends Model{
    static init(sequelize){
        super.init({
            cargo_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            acesso_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            permissao_ativo: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            }
        },{
            sequelize,
            modelName: 'db_permissao',
            freezeTableName: true,
            timestamps: false
        })
        return this
    }
}
export default Permissao