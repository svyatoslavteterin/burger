import Model from './Model';

export default class Address extends Model {
  plural='/Address';

  getAddressByStreet(street) {
    return this.getRequest(`${this.plural}/getByStreet`, { street });
  }

  getSelfDeliveryAddresses() {
    return this.getRequest(`${this.plural}/getSelfDeliveryAddresses`);
  }
}
