const doWork = async () => {
  throw new Error("wrong");
  return "Hola";
};

doWork()
  .then(res => {
    console.log("result", res);
  })
  .catch(e => {
    console.log("e", e);
  });
