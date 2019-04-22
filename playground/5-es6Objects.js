// Object property shorthand

const name = "Renan";
const age = "22";
const user = {
  name,
  age,
  location: "San Pedro Sula"
};

console.log(user);

// Object destructuring
const product = {
  label: "notebook",
  price: 3,
  stock: 2011,
  salesPrice: undefined
};

const { label, price, rating = 5 } = product;
