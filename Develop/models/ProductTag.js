const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncremental: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      //need to reference the product model's id
    },
    tag_id: {
      type: DataTypes.INTEGER,
      //need to reference the tag model's id
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;