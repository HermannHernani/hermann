import {Model,Sequelize} from 'sequelize'

class Vinculacao extends Model{
    static init(sequelize){
        super.init({
            paciente_id: {
                primaryKey: true,
                type: Sequelize.STRING,
                allowNull: false
            },
            unidade_id: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                allowNull: false
            },
            vinculacao_inicio: {
                type: Sequelize.DATE,
                allowNull: true
            },
            vinculacao_fim: {
                type: Sequelize.DATE,
                allowNull: true
            },
            vinculacao_ativo: {
                type: Sequelize.BOOLEAN,
                allowNull: true
            }
        },{
            sequelize,
            modelName: 'db_vinculacao',
            freezeTableName: true,
            timestamps: false
        })
        return this
    }
}
export default Vinculacao