import { find, remove } from 'lodash';
import Money from 'dinero.js';

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

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
    cart.reduce((acc, item) => {
      const { quantity, product, condition } = item;
      const amount = Money({ amount: acc + quantity * product.price });
      let discount = Money({ amount: 0 });

      if (condition && condition.percentage && quantity > condition.minimum) {
        discount = amount.percentage(condition.percentage);
      }
      return amount.subtract(discount).getAmount();
    }, Money({ amount: 0 }).getAmount());

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
