'use strict';
 
module.exports = {
 up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn(
     'users',
     'unity_id',
     {
     type:Sequelize.INTEGER,
     references:{
       model:'unity',
       key:'id'
     },
     onUpdate:'CASCADE',
     onDelete:'SET NULL',
     allowNull:true,
   })
  
 },
 
 down: (queryInterface) => {
   return queryInterface.dropColumn('users','unity_id')
 }
};
