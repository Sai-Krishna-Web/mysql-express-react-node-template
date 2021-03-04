module.exports = (sequelize, Sequelize) => {
  const Entities = sequelize.define("entities", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return Entities;
};
