'use strict';

import {DataTypes, QueryInterface} from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.addColumn('Categories', 'imagePath',
      {
        type: DataTypes.STRING
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
    await queryInterface.removeColumn('Categories', 'imagePath')
  }
};
