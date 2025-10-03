
// lightweight particle graph background
const canvas = document.getElementById('bg-canvas');
const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;

let w=0,h=0, particles=[];
function resize(){ if(!canvas) return; w=canvas.width=innerWidth; h=canvas.height=innerHeight; }
function rand(min,max){ return Math.random()*(max-min)+min; }

class Particle {
  constructor(){
    this.x=rand(0,w);
    this.y=rand(0,h);
    this.vx=rand(-0.3,0.3);
    this.vy=rand(-0.3,0.3);
    this.r=rand(1,3);
  }
  move(){
    this.x += this.vx;
    this.y += this.vy;
    if(this.x<0||this.x>w) this.vx*=-1;
    if(this.y<0||this.y>h) this.vy*=-1;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,0.06)';
    ctx.fill();
  }
}

function createParticles(){
  particles=[];
  const count = Math.round((w*h)/80000);
  for(let i=0;i<count;i++) particles.push(new Particle());
}

function loop(){
  if(!ctx) return;
  ctx.clearRect(0,0,w,h);
  // draw connections
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const a=particles[i], b=particles[j];
      const dx=a.x-b.x, dy=a.y-b.y;
      const d2 = dx*dx+dy*dy;
      if(d2<15000){
        ctx.strokeStyle='rgba(123,198,218,'+(0.12 - d2/15000*0.12)+')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);
        ctx.stroke();
      }
    }
  }
  for(const p of particles){ p.move(); p.draw(); }
  requestAnimationFrame(loop);
}

window.addEventListener('resize', () => { resize(); createParticles(); });
if (canvas && ctx) { resize(); createParticles(); loop(); }
