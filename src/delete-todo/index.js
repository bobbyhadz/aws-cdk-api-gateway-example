/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */

async function main(event) {
  console.log('event is 👉', JSON.stringify(event, null, 2));
  return {
    body: JSON.stringify({
      todoId: event.pathParameters.todoId,
      text: 'Buy groceries ️🍕',
    }),
    statusCode: 200,
  };
}

module.exports = {main};
