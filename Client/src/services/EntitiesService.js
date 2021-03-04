import http from "../http-common";

const getAll = () => {
  return http.get("/entities");
};

const get = id => {
  return http.get(`/entities/${id}`);
};

const create = data => {
  return http.post("/entities", data);
};

const update = (id, data) => {
  return http.put(`/entities/${id}`, data);
};

const remove = id => {
  return http.delete(`/entities/${id}`);
};

const removeAll = () => {
  return http.delete(`/entities`);
};

const findByName = name => {
  return http.get(`/entities?name=${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};
