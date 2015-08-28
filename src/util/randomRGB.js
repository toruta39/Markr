export default function randomRGB() {
  const c = 0xffffff * Math.random();
  return [c >> 16, c >> 8 & 255, c & 255];
}
