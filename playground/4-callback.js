// setTimeout(() => {
//   console.log("two seconds are up");
// }, 2000);

// const geocode = (address, callback) => {
//   const data = { latitude: 0, longitude: 0 };
// };

const add = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 2000);
};

add(1, 4, sum => {
  console.log(sum); // Should print: 5
});
