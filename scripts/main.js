import { PhysicsEngine } from './physics.js';
import { PixelManager } from './pixelManager.js';
import { ImageGenerator } from './imageGenerator.js';

let physicsEngine;
let pixelManager;
let imageGenerator;
let isPhysicsActive = false;

window.addEventListener('DOMContentLoaded', () => {
  physicsEngine = new PhysicsEngine('physicsCanvas');
  pixelManager = new PixelManager();
  imageGenerator = new ImageGenerator();
  
  setupControls();
});

function setupControls() {
  const gravitySlider = document.getElementById('gravitySlider');
  const bounceSlider = document.getElementById('bounceSlider');
  const frictionSlider = document.getElementById('frictionSlider');
  
  gravitySlider.addEventListener('input', (e) => {
    physicsEngine.setGravity(parseFloat(e.target.value));
  });
  
  bounceSlider.addEventListener('input', (e) => {
    physicsEngine.setBounciness(parseFloat(e.target.value));
  });
  
  frictionSlider.addEventListener('input', (e) => {
    physicsEngine.setFriction(parseFloat(e.target.value));
  });
}

window.generateImage = async () => {
  const prompt = document.getElementById('imagePrompt').value;
  if (!prompt) return;

  const imageData = await imageGenerator.generate(prompt);
  const pixels = pixelManager.processImage(imageData);
  physicsEngine.resetSimulation();
  physicsEngine.addPixels(pixels);
};

window.togglePhysics = () => {
  isPhysicsActive = !isPhysicsActive;
  if (isPhysicsActive) {
    physicsEngine.start();
  } else {
    physicsEngine.stop();
  }
};