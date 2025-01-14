import { DataTypes, Model } from "sequelize";
import { Database } from "../database/connection";
import { User } from "./user.model";

const sequelize = new Database().getSequelize();

export class Repair extends Model {}

Repair.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Repair",
  }
);

Repair.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Repair, { foreignKey: "userId" });
