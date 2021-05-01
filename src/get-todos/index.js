/* eslint-disable @typescript-eslint/require-await */

async function main(event) {
  return {
    body: JSON.stringify([
      {todoId: 1, text: 'walk the dog 🐕'},
      {todoId: 2, text: 'cook dinner 🥗'},
    ]),
    statusCode: 200,
  };
}

module.exports = {main};
