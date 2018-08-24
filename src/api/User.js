import Model from './Model';

export default class Menu extends Model {
  plural='/Profiles';

  login(credentials) {
    return this.postRequest(`${this.plural}/login`, credentials);
  }

  regStep1(credentials) {
    return this.postRequest(`${this.plural}/regStep1`, credentials);
  }

  regStep2(credentials) {
    return this.postRequest(`${this.plural}/regStep2`, credentials);
  }

  resetPass(phone) {
    return this.postRequest(`${this.plural}/resetPass`, { phone });
  }

  checkCodeResetPassword(credentials) {
    return this.postRequest(`${this.plural}/resetPass`, credentials);
  }
}
