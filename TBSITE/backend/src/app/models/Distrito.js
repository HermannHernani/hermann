import {Model,Sequelize} from 'sequelize'

class Distrito extends Model{
    static init(sequelize){
        super.init({
            unidade_id: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false
            },
            unidade_nome: {
                type: Sequelize.STRING,
                allowNull: false
            },  
            unidade_cnes: {
                type: Sequelize.STRING,
                allowNull: false
            },
            unidade_distrito: {
                type: Sequelize.STRING,
                allowNull: false
            },
            unidade_ativo: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        },{
            sequelize,
            modelName: 'db_unidade',
            freezeTableName: true,
            timestamps: false
        })
        return this
    }
}
export default Unidade