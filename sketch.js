const flock = [];
const attractors = [];
let cubeDims, cubeLoc;
let xoff = 0.0;
let cursorVisibility = true;
let boxVisibility = false;
let lightsVisibility = false;
let saveCalled = false;
let halfSizeOn = false;
let goSim = false;
let patternScaler = 1;
let img, imgLogo;
let xCount = 20;
let yCount = 10;
let count = 0;
let sinCount = 0;
let alignSlider, separationSlider, cohesionSlider, aPerceptionRadius, sPerceptionRadius, cPerceptionRadius, aPerRadSliderText, cPerRadSliderText, sPerRadSliderText;
let playCheck, flockingCheck, gasCheck, gravityCheck, windCheck, patternCheck, halfWidthCheck, repelCheck, expandCheck, contractCheck;
let radius = 200;
let logoXList, logoYList;
let logoX;

function preload() {
  img = loadImage('assets/03_number.png');
  imgLogo = loadImage('assets/vaisala_logo.png');
  DMSans = loadFont('assets/DMSans-Medium.ttf');
  suisseMono = loadFont('assets/SuisseIntlMono-Regular.otf');
  logoXList = loadStrings('assets/logoLocList_vaisala_offset-2_5_x.txt');
  logoYList = loadStrings('assets/logoLocList_vaisala_offset-2_5_y.txt');
}

function setup() {
  //pres
  createCanvas(1920 * 2, 1080 * 2, WEBGL);
  //event
  // createCanvas(1462, 428, WEBGL);
  pixelDensity(1);
  let xListSorted = logoXList.toSorted();
  logoX = xListSorted[logoXList.length - 1];
  //pres
  cubeDims = createVector(1920 * 2, 1080 * 2, 1080 * 0.5);
  //event
  //cubeDims = createVector(1462, 428, 200);
  cubeLoc = createVector(0, 0, 0);
  // legacy set up for particles and attractors using let to grid as flock positions
  for (let i = 0; i < yCount; i++) {
    for (let j = 0; j < xCount; j++) {
      //grid positions
      // flock[(i * xCount) + j] = new Particle(map(j, 0, xCount, -cubeDims.x / 2 + (radius / 3), cubeDims.x / 2 - (radius / 10)), map(i, 0, yCount, -cubeDims.y / 2 + (radius / 3), cubeDims.y / 2 - (radius / 100)), cubeDims.z / 2, random(radius * 0.1, radius * 0.1), 100, 100);
      //random positionss
      flock[(i * xCount) + j] = new Particle(random(cubeDims.x) - cubeDims.x / 2, random(cubeDims.y) - cubeDims.y / 2, random(cubeDims.z) - cubeDims.z / 2, random(radius * 2, radius * 5), random(cubeDims.x) - cubeDims.x / 2, random(cubeDims.y) - cubeDims.y / 2);
    }
  }
  // draw logo as flock positions
  // for (let i = 0; i < logoXList.length; i++) {
  //   let currPos = createVector(logoXList[i], logoYList[i], 0);
  //   let swapPos = createVector(logoXList[logoXList.length - i - 1], logoYList[logoYList.length - i - 1], 0);
  //   //logo variable
  //   flock[i] = new Particle(currPos.x - width * 0.25, currPos.y - height * 0.25, currPos.z, random(30,30), swapPos.x - width * 0.25, swapPos.y - height * 0.25);
  // }
  drawUI();

}

function draw() {

  // ortho();
  orbitControl();
  background(0);
  if (lightsVisibility){
    lights();
    }
  if (boxVisibility){
  boundingBox();
  }


  for (let particles of flock) {
    if (playCheck.checked()) {
      particles.update();
    }
    if (flockingCheck.checked()) {
      particles.flock(flock);
    }

    if (gasCheck.checked()) {
      particles.applyGas(flock);
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

    particles.show();
    particles.checkCollision();
  }
  if (saveCalled && count < 2400) {
    frameRate(5);
    saveCanvas('test-output' + count, 'png');
    count++;
  }
  updateSlidersText();
}

function boundingBox() {
  push();
  stroke(219, 249, 58, 100);
  strokeWeight(1)
  noFill();
  translate(cubeLoc.x, cubeLoc.y, cubeLoc.z);
  box(cubeDims.x, cubeDims.y, cubeDims.z);
  //places a small logo in the center
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

  if (keyCode == 66 && boxVisibility) {
    boxVisibility = false;
  } else if (keyCode == 66 && !boxVisibility) {
    boxVisibility = true;
  }

  if (keyCode == 76 && lightsVisibility) {
    lightsVisibility = false;
  } else if (keyCode == 76 && !boxVisibility) {
    lightsVisibility = true;
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


