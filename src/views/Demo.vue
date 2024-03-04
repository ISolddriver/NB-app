<script setup lang="ts">
type Func = (args: string) => void
const func: Func = (args) => {
  console.log(args)
}
func('hello')

interface Func1 {
  (a:number, b:number): number
}
const func1: Func1 = (a, b) => {
  return a + b
}
func1(1, 2)

</script>