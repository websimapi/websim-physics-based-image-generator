export class PixelManager {
  constructor() {
    this.pixels = [];
  }
  
  processImage(imageData) {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    
    tempCanvas.width = imageData.width;
    tempCanvas.height = imageData.height;
    tempCtx.drawImage(imageData, 0, 0);
    
    const imageDataArray = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height).data;
    this.pixels = [];
    
    for (let y = 0; y < tempCanvas.height; y += 4) {
      for (let x = 0; x < tempCanvas.width; x += 4) {
        const i = (y * tempCanvas.width + x) * 4;
        const r = imageDataArray[i];
        const g = imageDataArray[i + 1];
        const b = imageDataArray[i + 2];
        const a = imageDataArray[i + 3];
        
        if (a > 128) { // Only process non-transparent pixels
          this.pixels.push({
            x: x * (800 / tempCanvas.width),
            y: y * (600 / tempCanvas.height),
            color: `rgba(${r},${g},${b},${a/255})`,
            mass: (r + g + b) / 765 // Mass based on brightness
          });
        }
      }
    }
    
    return this.pixels;
  }
}