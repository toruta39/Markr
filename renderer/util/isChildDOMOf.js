export default function isChildDOMOf(a, b) {
  while (a) {
    if (a === b) return true;
    a = a.parentElement;
  }
  return false;
}
