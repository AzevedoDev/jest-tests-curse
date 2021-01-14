import Cart from './Cart';

let cart;
const product = {
  title: 'Adidas running shoes - men',
  price: 35388,
};
const product2 = {
  title: 'Adidas running shoes - women',
  price: 41872,
};

beforeEach(() => {
  cart = new Cart();
});

describe('Cart', () => {
  describe('getTotal(', () => {
    it('should return 0 when getTotal() is executed in a newly created instance', () => {
      expect(cart.getTotal()).toEqual(0);
    });
    it('should multiply quantity and price and receive the total amount', () => {
      const item = {
        product,
        quantity: 2,
      };
      cart.add(item);
      expect(cart.getTotal()).toEqual(70776);
    });
    it('should ensure no more than on product exists at a time', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product,
        quantity: 1,
      });
      expect(cart.getTotal()).toEqual(35388);
    });
    it('should update total when a product gets included and then removed', () => {
      cart.add({ product, quantity: 2 });
      cart.add({ product: product2, quantity: 1 });
      cart.removeItem(product);

      expect(cart.getTotal()).toEqual(41872);
    });
  });
  describe('checkout()', () => {
    it('should return an object with total and list of items', () => {
      cart.add({
        product,
        quantity: 2,
      });
      cart.add({
        product: product2,
        quantity: 1,
      });
      expect(cart.checkout()).toMatchSnapshot();
    });
    it('should return an object with total and list of items when call resume()', () => {
      cart.add({
        product,
        quantity: 2,
      });
      cart.add({
        product: product2,
        quantity: 1,
      });
      expect(cart.resume()).toMatchSnapshot();
    });
    it('should reset cart when checkout is called', () => {
      cart.add({
        product,
        quantity: 2,
      });
      cart.add({
        product: product2,
        quantity: 1,
      });
      cart.checkout();
      expect(cart.getTotal()).toEqual(0);
    });
  });
});
