'use strict';

import {DataTypes, QueryInterface} from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.addColumn('Post', 'userId',
            {
                type: DataTypes.INTEGER
            }
        )
    },

    async down(queryInterface: QueryInterface): Promise<void> {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn('Post', 'userId')
    }
};
