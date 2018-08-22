import Model from './Model';

export default class Menu extends Model {
  plural='/Profiles';

  login(credentials) {
    return this.postRequest(`${this.plural}/login`, credentials);
  }

  registration(credentials) {
    return this.postRequest(`${this.plural}/registration`, credentials);
  }
}
