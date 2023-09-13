import {DataTypes, QueryInterface, Transaction} from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
      async (transaction: Transaction): Promise<void> => {
        await queryInterface.createTable('Categories', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          categoryName: {
            type: DataTypes.STRING
          },
          description :{
            type: DataTypes.STRING
          }
        })
        // here go all migration changes

      }
  ),

  down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
      async (transaction) => {
        // here go all migration undo changes

        await queryInterface.dropTable("Categories")

      }
  )
};