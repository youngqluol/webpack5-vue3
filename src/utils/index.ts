export class ForTest {
  constructor() {
    const a = [{ b: 1 }];
    const $$a = [...a];
    const { b } = $$a[0];
    console.log(b);
  }
}

export function testFn(arg: number): number {
  console.log(1);
  return arg;
}
