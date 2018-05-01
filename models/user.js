module.exports = function(sequelize, Sequelize) {
    console.log("its getting here");
    var User = sequelize.define('user', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstName: {
            type: Sequelize.STRING,
            notEmpty: true,
        },
        lastName: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        passWord: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    });
    return User;
}
