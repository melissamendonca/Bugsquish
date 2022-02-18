let spriteSheet;
let character = [];
let count = 10;
let startTime;
let gameState = 'wait';

function preload() {
  spriteSheet = loadImage("bug pictures.png");
}


function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);

  for (i = 0; i < count; i++) {
    character[i] = new Character(spriteSheet,
    random(100, 500), random(width), random(1,5), random ([-1,1]));
    
  }
}

function draw() {
  background(255, 255, 255);  
  if (gameState == 'wait') {
    textSize(30);
    text('Press any key to start', 150, 300);
    if (mouseIsPressed) {
      startTime = millis();
      gameState = 'playing';
    }
  }
  else if (gameState == 'playing') {
    for (i = 0; i < count; i++) {
      character[i].draw();
    }
    let time = timer();
    let totalTime = 30;
    text("Time: " + (totalTime - time), 10, 30);
    if (time >= totalTime) {
      gameState = 'end';
    }
  }
  else if (gameState == 'end') {
    text("Game over", 150, 300);
    text("Press any key to restart", 150, 400);
    if (mouseIsPressed) {
      startTime = millis();
      gameState = 'playing';
    }
  }
}

function timer() {
  return int((millis() - startTime)/1000);

}


function mousePressed() {
  let dmin = -1
  let character_id = -1;
    
    for(i = 0; i < count; i++) {
      let d = character[i].grab();
      if (d != -1) {
        if (dmin == -1 || d < dmin) {
          dmin = d;
          character_id = i;
        }

      }
    }
    if (character_id != 1) [
      character[character.id].grab()
    ]
  }

  // function mouseDragged() {
  // for (i = 0; i < count; i++) {
  //  character[i].drag();
  // }
// }

// function mouseReleased() {
 // for (i = 0; i < count; i++) {
   // character[i].draw();
  // }
  // }

class Character{
  constructor(spriteSheet, x, y, speed, move) {
    this.spriteSheet = spriteSheet;
    this.x = x;
    this.y = y;
    this.facing = 1;
    this.speed = speed;
    this.move = move;
    this.facing = move;
    this.grabbed = false;
    this.spriteFrame = 0;
  }

  animate() {
    let sx, sy;
    if (this.move ==0) {
      if (this.grabbed) { //squish animation
        sx = 2; // 140 * 
        sy = 5; 
      }
    }
      
    else {
      sx = this.spriteFrame % 8 + 1;
      sy = 0; // 0 
    }

    return [sx, sy];
    }
    
  draw() {
    push();
    translate(this.x, this.y);
    scale(this.facing, 1);

    let [sx, sy] = this.animate(); // each sprite is 140 by 200 pixels FOR WALKING
    image(this.spriteSheet, 0, 0, 100, 100, 140 * sx, 200 * sy, 140, 200);

    if (frameCount % 5 == 0) {
      this.spriteFrame +=1;
    }
    //movement
    this.x += this.speed * this.move;

    if (this.x < 30) {
      this.move = 1;
      this.facing = 1;
    }
    else if (this.x > width - 30) {
      this.move = -1;
      this.facing = -1;
    }
    pop();
  }

    
  

  go(direction) {
    this.move = direction;
    this.facing = direction;
    this.sx = 3;
  }

  stop() {
    this.move = 0;
  }

  grabCheck() {
    let d = -1;
    if (mouseX > this.x - 20 && mouseX < this.x + 20 && mouseY > this.y - 20 && mouseY < this.y + 20) {
        d = dist(mouseX, mouseY, this.x, this.y);
    }
    return d;
  }

  grab() {
    if (mouseX > this.x - 20 && mouseX < this.x + 20 && mouseY > this.y - 20 && mouseY < this.y + 20) {
      this.stop();
      this.grabbed = true;
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }
    drag() {
      if (this.grabbed) {
        this.x = mouseX + this.offsetX;
        this.y = mouseY + this.offsetY;
      }
    }

    drop() {
      if (this.grabbed) {
        this.go(this.facing);
        this.grabbed = false;
      }
    }
}
  
