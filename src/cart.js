function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть положительным числом');
  }

  const cartItem = cart.find((item) => item.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;
  const newQuantity = currentQuantity + quantity;

  if (newQuantity > product.stock) {
    throw new RangeError('Нельзя добавить больше товара, чем есть на складе');
  }

  if (cartItem) {
    return cart.map((item) =>
        item.id === product.id ? { ...item, quantity: newQuantity } : item
    );
  }

  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, id, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть положительным числом');
  }

  const cartItem = cart.find((item) => item.id === id);
  if (!cartItem) return cart;

  if (quantity > cartItem.stock) {
    throw new RangeError('Нельзя установить количество больше, чем есть на складе');
  }

  return cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
  );
}

function removeFromCart(cart, id) {
  return cart.filter((item) => item.id !== id);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);

  let discount = 0;

  if (promoCode === 'SAVE10' && subtotal >= 20000) {
    discount = Math.floor(subtotal * 0.1);
  }

  const delivery = subtotal >= 50000 ? 0 : 30000;
  const total = subtotal - discount + delivery;

  return { subtotal, discount, delivery, total };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
