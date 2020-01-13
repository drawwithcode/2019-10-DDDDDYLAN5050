var myStar;
var num_star = 200;
var allStars = [];
var hit = 0;
var hitwig = 0;
var graphics;

function star(_speed, _size, _color) {
  this.x = random(-8, 8) * windowWidth;
  this.y = 1200;
  this.z = random(-50000);
  this.speed = _speed;
  this.color = _color;
  this.size = _size;
  var h = random(-1500, -4000);
  var zpos = this.z;
  this.move = function () {
    if (zpos < 0) {
      zpos += this.speed;
    } else {
      this.x = random(-8, 8) * windowWidth;
      this.y = 1200;
      zpos -= 50000;
    }
  }
  this.display = function () {
    stroke(this.color);
    strokeWeight(5 * mouseY / height);
    // noFill();
    // fill(this.color);
    texture(graphics);
    push();
    translate(this.x, this.y, zpos);
    rotateY(frameCount / 200);
    cone(this.size, h, 4);
    var dis = dist(this.x, this.y, zpos, mouseX - width / 2, mouseY - height / 2, 0);
    if (dis < 250) {
      hit++;
      hitwig = 30;
      console.log(hit);
    }
    pop();
  }
}


function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight, WEBGL);
  perspective(PI / 2.0, width / height, 0.01, 50000);
  // setAttributes('antialias', true);
  colorMode(HSB);
  for (var i = 0; i < num_star; i++) {
    var stars = new star(50, random(750, 5000), color(random(220, 320), 200, 180));
    allStars.push(stars);
  }


  graphics = createGraphics(300, 300);
  graphics.background("blue");
  for (var i = 0; i < graphics.height; i += 1) {
    graphics.fill(lerpColor(color("#487aff"), color("#d707fd"), i / graphics.height));
    graphics.noStroke();
    graphics.rect(0, i, graphics.height, 1);
  }

}

function draw() {
  orbitControl();
  background(lerpColor(color("#4e035b"), color("#08002a"), mouseY / height));

  var locX = -mouseX + height / 2;
  var locY = -mouseY + width / 2;
  directionalLight(255, 0, 255 * (1 - mouseY / height), locX, locY, -2000);
  ambientLight(0, 0, 12);

  push();
  texture(graphics);
  noStroke();
  translate(0, 1200);
  rotateX(PI / 2);
  // rotateZ(-PI/2);
  plane(50000, 50000);
  pop();

  push();
  // normalMaterial();
  noStroke();
  emissiveMaterial(lerpColor(color("#fe87a4"), color("#fe4075"), mouseY / height));
  translate((mouseX - width / 2) * 80, (mouseY - height / 1.2) * 50, -40000);
  // sphere(4000,4000,12);
  ellipse(0, 0, 15000, 15000);
  pop();

  for (var i = 0; i < allStars.length; i++) {
    var b = allStars[i];
    b.move();
    b.display();
  }
}
