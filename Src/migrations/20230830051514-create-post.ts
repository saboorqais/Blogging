import {DataTypes, QueryInterface, Transaction} from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async (transaction: Transaction): Promise<void> => {
           await queryInterface.createTable('Users', {
               id: {
                   allowNull: false,
                   autoIncrement: true,
                   primaryKey: true,
                   type: DataTypes.INTEGER
               },
                firstName: {
                    type: DataTypes.STRING
                },
                lastName: {
                    type: DataTypes.STRING
                },
                email: {
                    type: DataTypes.STRING,
                    unique: true,
                },
            })
            // here go all migration changes
            await queryInterface.createTable("Post", {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: DataTypes.INTEGER
                },
                name: DataTypes.STRING,
                title:DataTypes.STRING,
                body:DataTypes.TEXT,
                topic:DataTypes.STRING
            })
        }
    ),

    down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async (transaction) => {
            // here go all migration undo changes

            await queryInterface.dropTable("Post")
            await queryInterface.dropTable("Users")
        }
    )
};