export function arrayMove(array: any[], src: number, dest: number) {
  let el = array[src];
  array.splice(src, 1);
  array.splice(dest, 0, el);
}
