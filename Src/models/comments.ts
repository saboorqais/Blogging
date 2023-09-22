import { DataTypes, Model } from "sequelize";
import { CommentSchema } from "../Types/Types";
import sequelize from "../SequelizeClient/Sequelize";

class Comment extends Model<CommentSchema> implements CommentSchema {
  public id!: number;
  public text!: string;
  public userId!: number;
  public parentId: number ;
  public postId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Comment",
  }
);

//

Comment.belongsTo(Comment, { as: "parent", foreignKey: "parentId" });
Comment.hasMany(Comment, { as: "replies", foreignKey: "parentId" });

export { Comment };
