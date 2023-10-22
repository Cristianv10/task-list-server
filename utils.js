const printSeparator = () => console.log('-------------------------------');
const prompt = (question) => {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    readline.question(question, (input) => {
      readline.close();
      resolve(input);
    });
  });
};

module.exports = {printSeparator, prompt}