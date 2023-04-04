'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/hashpasswor')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Comment)
      User.hasMany(models.Purchase)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username required'
        },
        notNull: {
          msg: 'Username required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Email required'
        },
        notNull: {
          msg: 'Email required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password required'
        },
        notNull: {
          msg: 'Password required'
        }
      }
    },
    imgUrl: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, options) => {
    user.password = hash(user.password)
  });

  return User;
};