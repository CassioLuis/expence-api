export default function toPascalCase (str: string): string {
  if (!str) return ''
  return str.replace(/(\w)(\w*)/g, function (_: any, first: string, rest: string) {
    return first.toUpperCase() + rest.toLowerCase();
  })
}