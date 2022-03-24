import {Model,Sequelize} from 'sequelize'

class Cargo extends Model{
    static init(sequelize){
        super.init({
            cargo_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            cargo_nome: {
                type: Sequelize.STRING,
                allowNull: false
            },
            cargo_ativo: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        },{
            sequelize,
            modelName: 'db_cargo',
            freezeTableName: true,
            timestamps: false
        })
        return this
    }
}
export default Cargo