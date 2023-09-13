'use strict';

import {QueryInterface} from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface :QueryInterface):Promise<void> {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint("Post",{
      fields: ['userId'],         // The column to add the constraint to
      type: 'foreign key',
      name: 'posts_userId_fkey',
      // Constraint name
      references: {
        table: 'Users',           // Referenced table
        field: 'id'               // Referenced column in the 'Users' table
      },
      onDelete: 'cascade',        // Optional: Specify the ON DELETE action
      onUpdate: 'cascade'         // Optional: Specify the ON UPDATE action
    })
  },

  async down (queryInterface :QueryInterface):Promise<void>  {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint("Post","userId")
  }
};
