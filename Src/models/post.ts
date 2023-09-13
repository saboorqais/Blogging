import sequelize from "../SequelizeClient/Sequelize";
import {DataTypes, Model} from "sequelize";
import {PostSchema} from "../Types/Types";
import {Comment} from "./comments";

class Post extends Model<PostSchema> implements PostSchema {
    public id!: number;
    public name!: string;
    public title!: string | null;
    public body!: string;
    public topic!: string;
    public imagePath! :string;
    public userId!: number;
    public categoryId!:number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING,

        },
        body: {
            type: DataTypes.TEXT,
        },
        topic: {
            type: DataTypes.STRING
        },
        userId: {  // Define userId as a foreign key
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',  // Referencing the User model
                key: 'id'       // Using the primary key 'id'
            }
        },
        categoryId: {  // Define userId as a foreign key
            type: DataTypes.INTEGER,
            references: {
                model: 'Categories',  // Referencing the User model
                key: 'id'       // Using the primary key 'id'
            }
        },
        imagePath: {  // Define userId as a foreign key
            type: DataTypes.STRING,

        }


    },
    {
        sequelize,
        modelName: 'Post',
    }
);
Comment.belongsTo(Post, {foreignKey: 'postId'}); // Many-to-One association
Post.hasMany(Comment, {foreignKey: 'postId'});


export {Post}