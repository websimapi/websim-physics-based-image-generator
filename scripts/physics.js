export class PhysicsEngine {
  constructor(canvasId) {
    this.engine = Matter.Engine.create();
    this.world = this.engine.world;
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    
    this.render = Matter.Render.create({
      canvas: this.canvas,
      engine: this.engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: 'transparent'
      }
    });
    
    this.pixelBodies = [];
    this.setupBoundaries();
  }
  
  setupBoundaries() {
    const walls = [
      Matter.Bodies.rectangle(400, 610, 810, 20, { isStatic: true }), // bottom
      Matter.Bodies.rectangle(400, -10, 810, 20, { isStatic: true }), // top
      Matter.Bodies.rectangle(-10, 300, 20, 620, { isStatic: true }), // left
      Matter.Bodies.rectangle(810, 300, 20, 620, { isStatic: true }) // right
    ];
    
    Matter.World.add(this.world, walls);
  }
  
  addPixels(pixels) {
    this.pixelBodies = pixels.map(pixel => {
      const body = Matter.Bodies.circle(pixel.x, pixel.y, 2, {
        render: {
          fillStyle: pixel.color
        },
        restitution: this.bounciness,
        friction: this.friction
      });
      
      return body;
    });
    
    Matter.World.add(this.world, this.pixelBodies);
  }
  
  start() {
    Matter.Engine.run(this.engine);
    Matter.Render.run(this.render);
  }
  
  stop() {
    Matter.Engine.clear(this.engine);
    Matter.Render.stop(this.render);
  }
  
  resetSimulation() {
    Matter.World.clear(this.world, false);
    this.setupBoundaries();
    this.pixelBodies = [];
  }
  
  setGravity(value) {
    this.engine.world.gravity.y = value;
  }
  
  setBounciness(value) {
    this.bounciness = value;
    this.pixelBodies.forEach(body => {
      body.restitution = value;
    });
  }
  
  setFriction(value) {
    this.friction = value;
    this.pixelBodies.forEach(body => {
      body.friction = value;
    });
  }
}