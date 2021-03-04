import React, { useState, useEffect } from "react";
import EntitiesDataService from "../services/EntitiesService";

const Entity = props => {
  const initialEntityState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentEntity, setCurrentEntity] = useState(initialEntityState);
  const [message, setMessage] = useState("");

  const getEntity = id => {
    EntitiesDataService.get(id)
      .then(response => {
        setCurrentEntity(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getEntity(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentEntity({ ...currentEntity, [name]: value });
  };

  const updateEntity = () => {
    EntitiesDataService.update(currentEntity.id, currentEntity)
      .then(response => {
        console.log(response.data);
        setMessage("The entity was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteEntity = () => {
    EntitiesDataService.remove(currentEntity.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/entities");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentEntity ? (
        <div className="edit-form">
          <h4>Entity</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentEntity.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentEntity.description}
                onChange={handleInputChange}
              />
            </div>

          </form>

          <button className="badge badge-danger mr-2" onClick={deleteEntity}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateEntity}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
          <div>
            <br />
            <p>Please click on a Entity...</p>
          </div>
        )}
    </div>
  );
};

export default Entity;
