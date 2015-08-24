export default function() {
  if (arguments[0] instanceof Image) {
    let image = arguments[0];
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }
}
