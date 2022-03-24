import {Model,Sequelize} from 'sequelize'

class Agenda extends Model{
    static init(sequelize){
        super.init({
            agenda_id: {
                type: Sequelize.STRING,
                allowNull: false
            },
            agenda_status: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            agenda_horario_tomado:{
                type: Sequelize.DATE,
                allowNull: true
            }
        },{
            sequelize,
            modelName: 'db_agenda'
        })
        return this
    }
}
export default Agenda