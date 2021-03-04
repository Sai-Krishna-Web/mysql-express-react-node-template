import React, { useState, useEffect, useRef } from "react";
import EntitiesDataService from "../services/EntitiesService";
import { Typeahead, withAsync } from 'react-bootstrap-typeahead';
const AsyncTypeahead = withAsync(Typeahead);


const EntitiesList = () => {
  const [entities, setEntities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchName, setSearchName] = useState("");

  const ref = useRef();

  useEffect(() => {
    retrieveEntities();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e;
    setSearchName(searchName);
  };

  const retrieveEntities = () => {
    EntitiesDataService.getAll()
      .then(response => {
        setEntities(response.data);
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  useEffect(() => {
    setIsLoading(true);
    EntitiesDataService.findByName(searchName)
      .then(response => {
        setEntities(response.data);
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    setIsLoading(false);
  }, [searchName]);

  return (
    <div className="list row">
      <div className="col-md-12">
        <h4> Entities List</h4>
      </div>
      <div className="col col-md-12">
        <div className="serachContainer">
          <React.Fragment>
            <AsyncTypeahead
              defaultSelected={entities.slice(0, 1)}
              id="public-methods-example"
              labelKey="name"
              multiple
              options={entities}
              onSearch={(e) => onChangeSearchName(e)}
              placeholder="Search and choose entities..."
              //selected={selectedEntities}
              isLoading={isLoading}
              ref={ref}
            />


          </React.Fragment>
          <button type="button" className="btn btn-outline-secondary" onClick={() => ref.current.clear()}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntitiesList;
