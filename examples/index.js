import { Calc as MS } from '../src'

const vectorA = MS.createVector(500, 500);
const vectorB = MS.createVector(100, 100);
const vectorC = MS.createVector(110, 110);

console.log("original", vectorA, vectorB, vectorC);

vectorA.mult(10);
console.log("mult", vectorA);

vectorA.div(2, 4);
console.log("div", vectorA);

vectorA.add(2, 4);
console.log("add", vectorA);

vectorA.sub(20, 9);
console.log("sub", vectorA);

vectorA.limit(25);
console.log("limit to 25", vectorA);

vectorA.limit(10);
console.log("limit to 10", vectorA);

vectorA.add(200);
console.log("add 200", vectorA);

vectorA.limit(200);
console.log("limit to 200", vectorA);

vectorA.add(250);
console.log("add 250", vectorA);

vectorA.unLimit();
vectorA.x = 5000;
console.log("unlimit vector x", vectorA.x);

console.log("heading", vectorA.heading(vectorA.x + 100, vectorA.y + 100));

vectorA.limit(0.1, 0.5);
console.log("limit to 0.1, 0.5", vectorA);

console.log("constrain", MS.constrain(50, 0, 30));
console.log("constrain", MS.constrain(-50, 0, 30));
console.log("constrain", MS.constrain(17, 0, 30));
console.log("constrain", MS.constrain(-3, -5, 0));

console.log("dist", MS.dist(vectorA.x, vectorA.y, vectorB.x, vectorB.y));
console.log("dist", MS.dist(vectorB.x, vectorB.y, vectorC.x, vectorC.y));

const heading = MS.heading(100, 10, -150, 50);
console.log("General heading", heading);
const toDegrees = MS.toDegrees(heading);
console.log("Radian to degrees", toDegrees);
const toRadian = MS.toRadians(toDegrees);
console.log("Degrees to radians", toRadian);

// /***************** EXAMPLE *****************/
// class Particle {
//   constructor(ctx, x, y, width, height) {
//     this.ctx = ctx;
//     this.r = 5;
//     this.pos = MS.createVector(x, y);
//     this.vel = MS.createRandomVector();
//     this.acc = MS.createRandomVector();
//   }

//   update() {
//     // Change position
//     this.pos.x += this.vel.x;
//     this.pos.y += this.vel.y;

//     // Add acceleration
//     this.vel.x += this.acc.x;
//     this.vel.y += this.acc.y;

//     if (this.acc.x > 0) {
//       this.acc.x -= 0.1
//       this.acc.y -= 0.1
//     }

//     if (this.pos.x >= canvasWidth || this.pos.x <= 0) {
//       this.vel.x *= -1;
//     }

//     if (this.pos.y >= canvasHeight || this.pos.y <= 0) {
//       this.vel.y *= -1;
//     }
//   }

//   render() {
//     this.ctx.beginPath();
//     this.ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
//     ctx.strokeStyle = "#FF0000";
//     this.ctx.stroke();
//   }
// }

// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");
// const canvasWidth = 400;
// const canvasHeight = 400;
// const particles = [];
// let stop = false;

// function createParticles() {
//   for (let i = 0; i < 5; i++) {
//     const x = 100;
//     const y = 100;
//     particles.push(new Particle(ctx, x, y));
//   }
// }

// function clearCanvas() {
//   ctx.clearRect(0, 0, canvasWidth, canvasHeight);
// }

// function draw(timestamp) {
//   clearCanvas();

//   for (const particle of particles) {
//     particle.render();
//     particle.update();
//   }

//   if (!stop) {
//     window.requestAnimationFrame(draw);
//   }
// }

// createParticles();
// draw();
