import {Model,Sequelize} from 'sequelize'

class Designacao extends Model{
    static init(sequelize){
        super.init({
            cargo_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            profissional_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            designacao_inicio: {
                type: Sequelize.DATE,
                allowNull: true
            },
            designacao_fim: {
                type: Sequelize.DATE,
                allowNull: true
            },
            designacao_ativo: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            }
        },{
            sequelize,
            modelName: 'db_designacao',
            freezeTableName: true,
            timestamps: false
        })
        return this
    }
}
export default Designacao