import {Model,Sequelize} from 'sequelize'

class Lotacao extends Model{
    static init(sequelize){
        super.init({
            unidade_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            profissional_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            lotacao_inicio: {
                type: Sequelize.DATE,
                allowNull: true
            },
            lotacao_fim: {
                type: Sequelize.DATE,
                allowNull: true
            },
            lotacao_ativo: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            }
        },{
            sequelize,
            modelName: 'db_lotacao',
            freezeTableName: true,
            timestamps: false
        })
        return this
    }
}
export default Lotacao