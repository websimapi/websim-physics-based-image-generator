import { PhysicsEngine } from './physics.js';
import { PixelManager } from './pixelManager.js';
import { ImageGenerator } from './imageGenerator.js';

class App {
  constructor() {
    this.physicsEngine = null;
    this.pixelManager = null;
    this.imageGenerator = null;
    this.isPhysicsActive = false;
    
    // Wait for DOM and Matter.js to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initialize());
    } else {
      this.initialize();
    }
  }

  initialize() {
    if (typeof Matter === 'undefined') {
      console.error('Matter.js not loaded');
      return;
    }

    try {
      this.physicsEngine = new PhysicsEngine('physicsCanvas');
      this.pixelManager = new PixelManager();
      this.imageGenerator = new ImageGenerator();
      this.setupControls();
    } catch (error) {
      console.error('Initialization error:', error);
    }
  }

  setupControls() {
    const gravitySlider = document.getElementById('gravitySlider');
    const bounceSlider = document.getElementById('bounceSlider');
    const frictionSlider = document.getElementById('frictionSlider');
    
    if (gravitySlider) {
      gravitySlider.addEventListener('input', (e) => {
        this.physicsEngine.setGravity(parseFloat(e.target.value));
      });
    }
    
    if (bounceSlider) {
      bounceSlider.addEventListener('input', (e) => {
        this.physicsEngine.setBounciness(parseFloat(e.target.value));
      });
    }
    
    if (frictionSlider) {
      frictionSlider.addEventListener('input', (e) => {
        this.physicsEngine.setFriction(parseFloat(e.target.value));
      });
    }
  }

  async generateImage() {
    try {
      const promptElement = document.getElementById('imagePrompt');
      if (!promptElement) return;
      
      const prompt = promptElement.value;
      if (!prompt) return;

      const imageData = await this.imageGenerator.generate(prompt);
      const pixels = this.pixelManager.processImage(imageData);
      this.physicsEngine.resetSimulation();
      this.physicsEngine.addPixels(pixels);
    } catch (error) {
      console.error('Generation error:', error);
    }
  }

  togglePhysics() {
    try {
      this.isPhysicsActive = !this.isPhysicsActive;
      if (this.isPhysicsActive) {
        this.physicsEngine.start();
      } else {
        this.physicsEngine.stop();
      }
    } catch (error) {
      console.error('Toggle physics error:', error);
    }
  }
}

// Initialize app and expose to window
window.app = new App();
window.generateImage = async () => await window.app.generateImage();
window.togglePhysics = () => window.app.togglePhysics();