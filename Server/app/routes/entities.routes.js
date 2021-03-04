module.exports = app => {
  const entities = require("../controllers/entities.controller.js");

  var router = require("express").Router();

  // Add a new entitie
  router.post("/", entities.create);

  // Retrieve all entities
  router.get("/", entities.findAll);

  // Retrieve a single entitie with id
  router.get("/:id", entities.findOne);

  // Update a entitie with id
  router.put("/:id", entities.update);

  // Delete a entitie with id
  router.delete("/:id", entities.delete);

  // Delete all entities
  router.delete("/", entities.deleteAll);

  app.use('/api/entities', router);
};
