export class ImageGenerator {
  constructor() {
    this.counter = 0;
  }
  
  async generate(prompt) {
    // In a real implementation, this would call an AI image generation API
    // For demonstration, we'll create a simple colored gradient
    const imgId = `generated-${this.counter++}`;
    
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 150;
      const ctx = canvas.getContext('2d');
      
      // Create a gradient based on the prompt string hash
      const hash = this.hashString(prompt);
      const gradient = ctx.createLinearGradient(0, 0, 200, 150);
      gradient.addColorStop(0, `hsl(${hash % 360}, 70%, 50%)`);
      gradient.addColorStop(1, `hsl(${(hash * 1.5) % 360}, 70%, 50%)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 200, 150);
      
      // Convert canvas to image
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = canvas.toDataURL();
    });
  }
  
  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
}