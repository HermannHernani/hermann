import {Model,Sequelize} from 'sequelize'

class Tratamento extends Model{
    static init(sequelize){
        super.init({
            tratamento_id: {
                type: Sequelize.STRING,
                allowNull: false
            },
            tratamento_receita:{
                type: Sequelize.INTEGER,
                allowNull: false
            },
            tratamento_ingestao:{
                type: Sequelize.INTEGER,
                allowNull: false
            },
            tratamento_dia:{
                type: Sequelize.STRING,
                allowNull: false
            }
        },{
            sequelize,
            modelName: 'db_tratamento'
        })
        return this
    }
}
export default Tratamento