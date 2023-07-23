
const rgbToHex = (r: number, g: number, b: number) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')
const rgbToStr = (r: number, g: number, b: number) => `rgba(${r}, ${g}, ${b}, 1)`;
const rgbArrToStr = (arr: number[]) => arr.length > 2 ? rgbToStr(arr[0], arr[1], arr[2]) : '';
const rgbArrToHex = (arr: number[]) => arr.length > 2 ? rgbToHex(arr[0], arr[1], arr[2]) : '';

export {
  rgbToHex,
  rgbToStr,
  rgbArrToHex,
  rgbArrToStr
}