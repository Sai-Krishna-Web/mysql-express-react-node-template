import React, { useState } from "react";
import EntitiesDataService from "../services/EntitiesService";

const AddEntity = () => {
  const initialEntityState = {
    id: null,
    name: "",
    description: ""
  };
  const [entity, setEntity] = useState(initialEntityState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEntity({ ...entity, [name]: value });
  };

  const saveEntity = () => {
    var data = {
      name: entity.name,
      description: entity.description
    };

    EntitiesDataService.create(data)
      .then(response => {
        setEntity({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newEntity = () => {
    setEntity(initialEntityState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      <h4>Add entities</h4>
      {submitted ? (
        <div>
          <h6>You submitted successfully!</h6>
          <button className="btn btn-success" onClick={newEntity}>
            Add more
          </button>
        </div>
      ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Title</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={entity.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={entity.description}
                onChange={handleInputChange}
                name="description"
              />
            </div>

            <button onClick={saveEntity} className="btn btn-success">
              Submit
          </button>
          </div>
        )}
    </div>
  );
};

export default AddEntity;
