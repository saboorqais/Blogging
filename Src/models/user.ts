import sequelize from "../SequelizeClient/Sequelize";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import { UserSchema } from "../Types/Types";
import { Post } from "./post";
import { Comment } from "./comments";

class User extends Model<UserSchema> implements UserSchema {
  public id!: number;
  public firstName!: string;
  public lastName!: string | null;
  public email!: string;
  public role!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string | Buffer) {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(value, saltRounds);
        this.setDataValue("password", hashedPassword);
      },
    },
  },
  {
    sequelize,
    modelName: "Users",
  }
);

Post.belongsTo(User, { foreignKey: "userId" }); // Many-to-One association
User.hasMany(Post, { foreignKey: "userId" }); //

Comment.belongsTo(User, { foreignKey: "userId" }); // Many-to-One association
User.hasMany(Comment, { foreignKey: "userId" });

export { User };
