import Model from './Model';

export default class Menu extends Model {
  plural='/Menu';

  getMenu() {
    return this.getRequest(`${this.plural}/getMenu2`);
  }

  getIndexes() {
    return this.getRequest(`${this.plural}/getIndexes`);
  }

  getIndexesTags() {
    return this.getRequest(`${this.plural}/getIndexesTags`);
  }
}
