'use strict';

import {DataTypes, QueryInterface} from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.addColumn('Users', 'role',
        {
          type: DataTypes.ENUM('admin', 'user'),
          allowNull: false,
          defaultValue: 'user',
        }
    )
      const newRole = 'user';
      // Update the "role" column for all users
      await queryInterface.sequelize.query(
          `UPDATE "Users" SET "role" = '${newRole}'`
      );

  },

  async down(queryInterface: QueryInterface): Promise<void> {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Users', 'role');

  }
};
