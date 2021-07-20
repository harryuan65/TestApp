import axios from 'axios';

// axios.defaults.headers.post['Accept'] = 'application/json';
// const apiPrefix = '/api/v1';
// axios.prototype.getPath = (path, data=null, config=null) => axios.get(`${apiPrefix}/${path}`, data, config);
// axios.prototype.postPath = (path, data=null, config=null) => axios.post(`${apiPrefix}/${path}`, data, config);
const API_PREFIX = '/api/v1';
class APIManager {
  constructor(){
    this.restClient = axios;
    this.restClient.defaults.headers.post['Accept'] = 'application/json';
    this.currentCSRFToken = document.querySelector('[name=csrf-token]').content;
    this.setCSRFToken(this.currentCSRFToken);
  }
  static Instance(){
    if (!APIManager.sharedInstance) {
      APIManager.sharedInstance = new this;
    }
    return APIManager.sharedInstance;
  }
  setCSRFToken(csrfToken) {
    this.restClient.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
    console.log(csrfToken);
  }
  async get(path, data) {
    return this.restClient.get(`${API_PREFIX}/${path}?${encodeData(data)}`)
  }

  async post(path, data) {
    return this.restClient.post(`${API_PREFIX}/${path}`, data);
  }

  async patch(path, data) {
    return this.restClient.patch(`${API_PREFIX}/${path}`, data);
  }

  async put(path, data) {
    return this.restClient.put(`${API_PREFIX}/${path}`, data);
  }

  async delete(path, data) {
    return this.restClient.delete(`${API_PREFIX}/${path}`, data);
  }
}
function encodeData(data={}) {
  return Object.keys(data).map((key) => `${key}=${encodeURIComponent(data[key])}`).join('&')
}
export default APIManager;