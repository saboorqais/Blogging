import {DataTypes, QueryInterface, Transaction} from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async (transaction: Transaction): Promise<void> => {
            await queryInterface.addColumn('Posts', 'categoryId',
                {
                    type: DataTypes.INTEGER
                }
            )
            await queryInterface.addConstraint("Posts", {
                fields: ['categoryId'],         // The column to add the constraint to
                type: 'foreign key',
                name: 'posts_categoryId_fkey',
                // Constraint name
                references: {
                    table: 'Categories',           // Referenced table
                    field: 'id'               // Referenced column in the 'Users' table
                },
                onDelete: 'cascade',        // Optional: Specify the ON DELETE action
                onUpdate: 'cascade'         // Optional: Specify the ON UPDATE action
            })
            // here go all migration changes

        }
    ),

    down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async (transaction) => {
            // here go all migration undo changes

            await queryInterface.removeConstraint("Posts", "categoryId")
            await queryInterface.removeColumn('Posts', 'categoryId')
        }
    )
};