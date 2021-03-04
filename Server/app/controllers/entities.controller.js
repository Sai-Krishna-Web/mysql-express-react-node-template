const db = require("../models");
const Entities = db.entities;
const Op = db.Sequelize.Op;

// Create and Save a new Entity
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "name can not be empty!"
    });
    return;
  }

  // Create a Entity
  const entity = {
    name: req.body.name,
    description: req.body.description,
  };

  // Save entity in the database
  Entities.create(entity)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Entity."
      });
    });
};

// Retrieve all Entities from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Entities.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Entities."
      });
    });
};

// Find a single Entity with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Entities.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Entity with id=" + id
      });
    });
};

// Update a Entity by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Entities.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Entity was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Entity with id=${id}. Maybe Entity was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Entity with id=" + id
      });
    });
};

// Delete a Entity with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Entities.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Entity was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Entity with id=${id}. Maybe Entity was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Entity with id=" + id
      });
    });
};

// Delete all Entities from the database.
exports.deleteAll = (req, res) => {
  Entities.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Entities were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Entities."
      });
    });
};

