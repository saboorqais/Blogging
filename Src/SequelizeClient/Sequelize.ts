import {Sequelize} from "sequelize";

const sequelize: Sequelize = new Sequelize('blog', 'postgres', 'saboor9494', {
    host: '127.0.0.1',
    dialect: 'postgres',

});

export default sequelize