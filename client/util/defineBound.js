export default function(obj, self) {
  for (var i in obj) {
    self[i] = obj[i].bind(self);
  }
}
