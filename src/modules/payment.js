import PaymentApi from '@/api/Payment';

export const actions = {
  getPayTypes: 'modules/payment/getPayTypes',
};

export default {
  actions: {
    async [actions.getPayTypes](ctx) {
      const Payment = new PaymentApi();
      const payments = await Payment.getPayTypes();
      return payments;
    },
  },
};
