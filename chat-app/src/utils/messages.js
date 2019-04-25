const generateMessage = text => {
  return { text, createdAt: Date.now() };
};

const generateLocationMessage = url => {
  return { url, createdAt: Date.now() };
};

module.exports = { generateMessage, generateLocationMessage };
