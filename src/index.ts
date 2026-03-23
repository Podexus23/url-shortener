import 'dotenv/config';

export function hello() {
  console.log('Hello templater');
  console.log(process.env.HELLO);
}

hello();
