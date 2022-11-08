import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(config);

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const deleteBlog = async (elementToDelete) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(config);
  const url = `${baseUrl}/${elementToDelete.id}`;
  console.log(url);
  const response = await axios.delete(url, config);
  console.log(response);

  return response.data;
};

const addLike = async (id, objectToModify) => {
  const response = await axios.put(`${baseUrl}/${id}`, objectToModify);

  return response.data;
};

export default { getAll, create, setToken, addLike, deleteBlog };
