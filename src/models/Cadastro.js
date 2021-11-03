const { Model, DataTypes } = require('sequelize');

class Cadastro extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Esse campo não pode ser vazio"
          },
          len: {
            args: [3, 50],
            msg: "Esse campo deve ter entre 4 e 50 cacteres"
          }
        }
      },
      nascimento: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Esse campo não pode ser vazio"
          },
          len: {
            args: [9, 10],
            msg: "Esse campo deve ter entre 10 caracteres"
          }
        }
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Esse campo não pode ser vazio"
          },
          len: {
            args: [14],
            msg: "Esse campo deve ter entre 14 cacteres"
          }
        }
      },
      tel: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Esse campo não pode ser vazio"
          },
          len: {
            args: [9, 15],
            msg: "Esse campo deve ter entre 9 e 14 cacteres"
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Esse campo precisa ser um email"
          },
        }
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Esse campo não pode ser vazio"
          },
          len: {
            args: [5, 100],
            msg: "Esse campo deve ter entre 5 e 50 cacteres"
          }
        }
      },
    }, {
      sequelize
    })
  }

}

module.exports = Cadastro;

