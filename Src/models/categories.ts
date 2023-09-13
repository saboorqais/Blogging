import sequelize from "../SequelizeClient/Sequelize";
import {DataTypes, Model} from "sequelize";
import {CategoriesSchema} from "../Types/Types";
import {Post} from "./post";

class Category extends Model<CategoriesSchema> implements CategoriesSchema {
    public id!: number;
    public description!: string;
    public categoryName!: string;
    public imagePath!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Category.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        categoryName: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }, imagePath: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        modelName: 'Categories',
    }
);

Post.belongsTo(Category, {foreignKey: 'categoryId'}); // Many-to-One association
Category.hasMany(Post, {foreignKey: 'categoryId'});   //


export {Category}