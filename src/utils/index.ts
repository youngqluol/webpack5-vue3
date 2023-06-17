export function fnForTest() {
  const map = new Map()
  map.set(1, () => {})
  console.log(map)
  const a = [1]
  console.log('if', a.includes(2))
}

export function testFn(arg: number): number {
  console.log(1)
  return arg
}
