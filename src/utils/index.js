export default class ForTest {
  constructor() {
    const a = [{ b: 1 }];
    const $$a = [...a];
    const { b } = $$a[0];
    console.log(b);
  }
}
