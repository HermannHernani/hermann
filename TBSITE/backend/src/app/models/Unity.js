import {Model,Sequelize} from 'sequelize'

class Unity extends Model{
    static init(sequelize){
        super.init({
            name:Sequelize.STRING,
            knes:Sequelize.STRING
        },{
            sequelize
        })
        return this
    }
}
export default Unity