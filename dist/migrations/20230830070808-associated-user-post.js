'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add altering commands here.
             *
             * Example:
             * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
             */
            yield queryInterface.addConstraint("Post", {
                fields: ['userId'],
                type: 'foreign key',
                name: 'posts_userId_fkey',
                // Constraint name
                references: {
                    table: 'Users',
                    field: 'id' // Referenced column in the 'Users' table
                },
                onDelete: 'cascade',
                onUpdate: 'cascade' // Optional: Specify the ON UPDATE action
            });
        });
    },
    down(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add reverting commands here.
             *
             * Example:
             * await queryInterface.dropTable('users');
             */
            yield queryInterface.removeConstraint("Post", "userId");
        });
    }
};
