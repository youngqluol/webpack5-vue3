export class ForTest {
  constructor() {
    const a = [{b: 1}];
    const _a = [...a];
    const { b } = _a[0];
    console.log(b);
  }
}