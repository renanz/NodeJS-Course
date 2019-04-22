function square(x) {
  return x * x;
}

const squareArrow = x => {
  return x * x;
};

console.log(squareArrow(3));

const event = {
  name: "Birthday Party",
  guestList: ["Person1", "Person2", "Person3"],
  printGuestList() {
    this.guestList.forEach(value => {
      console.log(value + " is attending " + this.name);
    });
  }
};

event.printGuestList();
