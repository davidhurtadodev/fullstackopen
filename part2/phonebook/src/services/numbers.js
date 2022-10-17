import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deleteEntry = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response);
};

const replaceNumber = (id, newEntry) => {
  const request = axios.put(`${baseUrl}/${id}`, newEntry);

  return request.then((response) => {
    console.log(response);
    return response.data;
  });
};

export const numbersService = {
  getAll,
  create,
  deleteEntry,
  replaceNumber,
};
