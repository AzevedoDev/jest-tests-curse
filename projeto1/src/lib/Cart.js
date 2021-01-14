import { find, remove } from 'lodash';

export default function Cart() {
  let cart = [];

  const add = item => {
    const itemToFind = { product: item.product };
    if (find(cart, itemToFind)) {
      remove(cart, itemToFind);
    }
    cart.push(item);
  };

  const removeItem = product => {
    remove(cart, { product });
  };

  const getTotal = () =>
    cart.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

  const resume = () => ({ total: getTotal(), items: cart });
  const checkout = () => {
    const { total, items } = resume();
    cart = [];
    return { total, items };
  };
  return {
    add,
    removeItem,
    getTotal,
    resume,
    checkout,
  };
}
