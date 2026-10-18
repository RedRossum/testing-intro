const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(sortProductsByPrice(products, 'asc').map(p => p.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    expect(sortProductsByPrice(products).map(p => p.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const subset = products.filter(({ id }) => [1, 3, 4].includes(id));
    expect(sortProductsByPrice(subset, 'asc').map(p => p.id)).toEqual([3, 4, 1]);
  });

  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    expect(sortProductsByPrice(products, 'desc').map(p => p.id)).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const subset = [products[2], products[0], products[3]];
    expect(sortProductsByPrice(subset, 'desc').map(p => p.id)).toEqual([1, 4, 3]);
  });

  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const subset = [products[4], products[1], products[5]];
    expect(sortProductsByPrice(subset, 'desc').map(p => p.id)).toEqual([2, 5, 6]);
  });

  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const subset = products.filter(({ id }) => [1, 3, 4].includes(id));
    const originalClone = [...subset];
    sortProductsByPrice(subset, 'asc');
    expect(subset).toEqual(originalClone);
  });

  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const subset = products.filter(({ id }) => [1, 3, 4].includes(id));
    const originalClone = [...subset];
    sortProductsByPrice(subset, 'desc');
    expect(subset).toEqual(originalClone);
  });

  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    const originalClone = [...products];
    sortProductsByPrice(products);
    expect(products).toEqual(originalClone);
  });
});
