import Model from './Model';

export default class Payment extends Model {
  plural='/Agents';

  getPayTypes() {
    return this.getRequest(`${this.plural}/getPayTypes`);
  }
}
