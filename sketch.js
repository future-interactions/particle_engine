const flock = [];
const attractors = [];
let cubeDims, cubeLoc;
// let attraction;
let xoff = 0.0;
let cursorVisibility = true;
let saveCalled = false;
let halfSizeOn = false;
let goSim = false;
let patternScaler = 1;
// let flocking = false;
// let naturalForces = false;
// let attractorsOn = false;
let img, imgLogo;
let xCount = 90;
let yCount = 50;
let count = 0;
let sinCount = 0;
let alignSlider, separationSlider, cohesionSlider;
let playCheck, flockingCheck, gravityCheck, windCheck, patternCheck, halfWidthCheck, repelCheck, expandCheck, contractCheck;
let radius = 200;
//experimental listnames for logo coordinates
let logoXList, logoYList;
let logoX;

function preload() {
  img = loadImage('assets/03_number.png');
  imgLogo = loadImage('assets/vaisala_logo.png');
  DMSans = loadFont('assets/DMSans-Medium.ttf');
  suisseMono = loadFont('assets/SuisseIntlMono-Regular.otf');
  //experimental load logo coordinates
  logoXList = loadStrings('assets/logoLocList_vaisala_offset-2_5_x.txt');
  logoYList = loadStrings('assets/logoLocList_vaisala_offset-2_5_y.txt');
  // logoXList = loadStrings('assets/logoLocList_vaisala_bits_offset-5_10_x.txt');
  // logoYList = loadStrings('assets/logoLocList_vaisala_bits_offset-5_10_y.txt');
}

function setup() {
  //pres
  createCanvas(1920 * 2, 1080 * 2, WEBGL);
  //event
  // createCanvas(1462, 428, WEBGL);

  pixelDensity(1);
  // print("cur+"+logoXList)

  //pres
  let xListSorted = logoXList.toSorted();
  logoX = xListSorted[logoXList.length - 1];
  //pres
  cubeDims = createVector(1920 * 2, 1080 * 2, 1080 * 0.1);

  //event
  // cubeDims = createVector(1462, 428, 200);
  cubeLoc = createVector(0, 0, 0);

  // legacy set up for particles and attractors using let
  for (let i = 0; i < yCount; i++) {
    for (let j = 0; j < xCount; j++) {
      // flock[(i * xCount) + j] = new Particle(map(j, 0, xCount, -cubeDims.x / 2 + (radius / 3), cubeDims.x / 2 - (radius / 10)), map(i, 0, yCount, -cubeDims.y / 2 + (radius / 3), cubeDims.y / 2 - (radius / 100)), cubeDims.z / 2, random(radius * 0.1, radius * 0.1), 100, 100);
      flock[(i * xCount) + j] = new Particle(random(cubeDims.x) - cubeDims.x / 2, random(cubeDims.y) - cubeDims.y / 2, random(cubeDims.z) - cubeDims.z / 2, random(radius * 0.2, radius * 0.2), 100, 100);

    }
  }
  // experimental draw logo
  // for (let i = 0; i < logoXList.length; i++) {
  //   let currPos = createVector(logoXList[i], logoYList[i], 0);
  //   let swapPos = createVector(logoXList[logoXList.length - i - 1], logoYList[logoYList.length - i - 1], 0);
  //   //logo variable
  //   flock[i] = new Particle(currPos.x - width * 0.25, currPos.y - height * 0.25, currPos.z, random(30,30), swapPos.x - width * 0.25, swapPos.y - height * 0.25);

  // }

  // }
  // for (let i = 0; i < 1; i++) {
  //   attractors.push(new Attractor(random(-cubeDims.x / 2, cubeDims.x / 2), random(-cubeDims.y/2, cubeDims.y / 2), 0,10));
  // }
  // attractor1 = new Attractor(width / 2, height / 2, 0, 10);
  //camera(0, 0, cubeDims.z *1.7);
  drawUI();
}

function draw() {
  // lights();
  // ortho();
  orbitControl();
  background(0);
  boundingBox();

  for (let particles of flock) {
    if (playCheck.checked()) {
      particles.update();
    }
    if (flockingCheck.checked()) {
      particles.flock(flock);
    }
    if (gravityCheck.checked()) {
      particles.applyGravity(flock);
    }

    if (windCheck.checked()) {
      particles.applyWind(flock);
    }
    if (patternCheck.checked()) {
      particles.applyPattern(flock);
    }
    if (halfWidthCheck.checked()) {
      particles.applyHalfWidth(flock);
    }

    if (repelCheck.checked()) {
      particles.applyRepel(flock);
    }

    if (expandCheck.checked()) {
      particles.applyExpand(flock);
    } else if (contractCheck.checked()) {
      particles.applyContract(flock);
    } else {
      particles.applyBacktoNormal(flock);
    }

    // if (contractCheck.checked()) {
    //   particles.applyContract(flock);
    // }else {
    //   particles.applyBacktoNormal(flock);
    // }

    particles.show();
    particles.checkCollision();
    // particles.applyAttraction();
  }
  if (saveCalled && count < 2400) {
    frameRate(5);
    saveCanvas('test-output' + count, 'png');
    count++;
  }
  // for (let attractor of attractors) {

  //     attractor.update();
  //     attractor.show();
  //   }
}

function boundingBox() {
  push();
  stroke(219, 249, 58, 100);
  //fill(219,249,58);//lime

  strokeWeight(1)
  noFill();
  translate(cubeLoc.x, cubeLoc.y, cubeLoc.z);
  // box(cubeDims.x, cubeDims.y, cubeDims.z);
  // image(imgLogo, 0-(imgLogo.width*0.1)/2,0, imgLogo.width * 0.1, imgLogo.height * 0.1);
  pop();
}


function keyPressed() {
  if (keyCode == 67 && cursorVisibility) {
    noCursor();
    cursorVisibility = false;
  } else if (keyCode == 67 && !cursorVisibility) {
    cursor();
    cursorVisibility = true;
  }
  if (keyCode == 83 && !saveCalled) {
    saveCalled = true;
  }
  if (keyCode == 88 && !halfSizeOn) {
    patternScaler = 0.5;
    halfSizeOn = true;
    print(patternScaler);
  } else if (keyCode == 88 && halfSizeOn) {
    patternScaler = 1;
    halfSizeOn = false;
    print(patternScaler);

  }

}




function mousePressed() {
  attractors.push(new Attractor(mouseX - width / 2, mouseY - height / 2, 0, 10));
}