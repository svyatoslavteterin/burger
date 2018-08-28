import axios from 'axios';

export default class Model {
  plural = '';
  apiUrl = 'https://apitest.burgerpizzoni.ru/api';

  getRequest(url, filter) {
    const options = {
      params: filter,
    };

    return axios.get(`${this.apiUrl}/${url}`, options)
    .then(result => result.data)
    .catch(error => error);
  }
  
  postRequest(url, options) {
    return axios.post(`${this.apiUrl}/${url}`, options)
      .then(result => result.data)
      .catch(error => error);
  }
}
