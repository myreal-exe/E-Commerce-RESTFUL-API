const faker = require('faker');

const createFakeProduct = () => ({
  name: faker.commerce.product(),
  price: faker.commerce.price(),
  description:faker.commerce.productAdjective()
})
exports.seed = async function(knex,Promise) {
  // Deletes ALL existing entries
  //return knex('table_name').del()
  const fakeProducts = [];
  const count = 500;
  for (let i = 0; i < count; i++) {
    fakeProducts.push(createFakeProduct());    
  }
  await knex('products').insert(fakeProducts);
};
