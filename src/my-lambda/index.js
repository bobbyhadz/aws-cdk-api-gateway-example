/* eslint-disable @typescript-eslint/require-await */

async function main(event) {
  console.log('region 👉', process.env.REGION);
  console.log('availability zones 👉', process.env.AVAILABILITY_ZONES);

  return {
    body: JSON.stringify({message: 'SUCCESS 🎉'}),
    statusCode: 200,
  };
}

module.exports = {main};
