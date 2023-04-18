import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response);
  };
  
  const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
  };
  
  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    .then(response => {console.log(response)})
    .catch(error => {console.log(error)});
    return request.then(response => response.data);
  };
  const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    .then(response => {console.log(response)})
    .catch(error => {console.log(error)});
    return request;
  };

  export default { getAll, create, update, remove }
