const flock = [];
const sliders = [];
const sliderText = [];
const checkBox = [];
const checkBoxText = [];

let cubeDims, cubeLoc;
let xoff = 0.0;
let cursorVisibility = true;
let boxVisibility = false;
let lightsVisibility = false;
let saveCalled = false;
let halfSizeOn = false;
let playing = false;
let flocking = false;
let gridFlock = false;
let goSim = false;
let patternScaler = 1;
let img, imgLogo;
let xCount = 25;
let yCount = 18;
let count = 0;
let sinCount = 0;
var alignSlider, separationSlider, cohesionSlider, aPerceptionRadius, sPerceptionRadius, cPerceptionRadius, aPerRadSliderText, cPerRadSliderText, sPerRadSliderText;
var playCheck, flockingCheck, gasCheck, gravityCheck, windCheck, patternCheck, halfWidthCheck, repelCheck, expandCheck, contractCheck, ranPosCheck;
let radius = 5;
let resetButton;
let logoXList, logoYList;
let logoX;

function preload() {
  img = loadImage('assets/03_number.png');
  imgLogo = loadImage('assets/vaisala_logo.png');
  DMSans = loadFont('assets/DMSans-Medium.ttf');
  suisseMono = loadFont('assets/SuisseIntlMono-Regular.otf');
  logoXList = loadStrings('assets/logoLocList_vaisala_offset-5_20_x.txt');
  logoYList = loadStrings('assets/logoLocList_vaisala_offset-5_20_y.txt');
}

function setup() {
  //pres
  createCanvas(1920, 1080, WEBGL);
  //event
  //pres
  cubeDims = createVector(960, 540, 540);
  //event
  //cubeDims = createVector(1462, 428, 200);
  // createCanvas(1462, 428, WEBGL);
  pixelDensity(1);
  drawUI();
  createFlock();
  // checkBox[5].checked(true);
}

function draw() {
  orbitControl();
  background(0);
  if (lightsVisibility) {
    lights();
  }
  if (boxVisibility) {
    boundingBox();
  }

  for (let particles of flock) {
    if (checkBox[1].checked()) {
      particles.update();
      playing = true;
    } else if (checkBox[1].checked(false)) {
      playing = false;
    }
    if (checkBox[8].checked()) {
      particles.flock(flock);
      flocking = true;
    } else if (checkBox[8].checked(false)) {
      flocking = false;
    }
    if (checkBox[9].checked()) {
      particles.applyGas(flock);
    }

    if (checkBox[11].checked()) {
      particles.applyGravity(flock);
    }

    if (checkBox[10].checked()) {
      particles.applyWind(flock);
    }
    // if (patternCheck.checked()) {
    //   particles.applyPattern(flock);
    // }


    if (checkBox[12].checked()) {
      particles.applyRepel(flock);
    }


    if (checkBox[3].checked()) {
      gridFlock = true;
    }else {
      gridFlock = false;

    }

    // if (expandCheck.checked()) {
    //   particles.applyExpand(flock);
    // } else if (contractCheck.checked()) {
    //   particles.applyContract(flock);
    // } else {
    //   particles.applyBacktoNormal(flock);
    // }

    particles.show();
    particles.checkCollision();
  }
  if (saveCalled && count < 2400) {
    // frameRate(5);
    // saveCanvas('test-output' + count, 'png');
    // count++;
  }
  updateSlidersText();
  resetButton.mousePressed(() => {
    createFlock();
  });
  cubeDims.x = sliders[1].value();
  cubeDims.y = sliders[2].value();
  cubeDims.z = sliders[3].value();

}

function boundingBox() {
  push();
  stroke(219, 249, 58);
  strokeWeight(3)
  noFill();
  translate(cubeLoc.x, cubeLoc.y, cubeLoc.z);
  box(cubeDims.x, cubeDims.y, cubeDims.z);
  //places a small logo in the center
  // image(imgLogo, 0-(imgLogo.width*0.1)/2,0, imgLogo.width * 0.1, imgLogo.height * 0.1);
  pop();
}

function createFlock() {
  let xListSorted = logoXList.toSorted();
  logoX = xListSorted[logoXList.length - 1];
  cubeLoc = createVector(0, 0, 0);
  // xCount = sqrt(sliders[4].value());
  // yCount = sqrt(sliders[4].value());
  // print(xCount);

  // particles using let to grid as flock positions
  if (gridFlock) {
    for (let i = 0; i < yCount; i++) {
      for (let j = 0; j < xCount; j++) {
        //grid positions
        flock[(i * xCount) + j] = new Particle(map(j, 0, xCount, -cubeDims.x / 2 + (radius / 3), cubeDims.x / 2 - (radius / 10)), map(i, 0, yCount, -cubeDims.y / 2 + (radius / 3), cubeDims.y / 2 - (radius / 100)), -cubeDims.z * 0.05, random(radius * 0.1, radius * 2), random(cubeDims.x) - cubeDims.x / 2, random(cubeDims.y) - cubeDims.y / 2);
        // flock[(i * xCount) + j] = new Particle(map(j, 0, xCount, -cubeDims.x / 2 + (radius / 3), cubeDims.x / 2 - (radius / 10)), map(i, 0, yCount, -cubeDims.y / 2 + (radius / 3), cubeDims.y / 2 - (radius / 100)), cubeDims.z / 2, random(radius * 0.1, radius * 0.1), 100, 100);
        // //random positionss
        // flock[(i * xCount) + j] = new Particle(random(cubeDims.x) - cubeDims.x / 2, random(cubeDims.y) - cubeDims.y / 2, random(cubeDims.z) - cubeDims.z / 2, random(radius*0.1, radius * 2), random(cubeDims.x) - cubeDims.x / 2, random(cubeDims.y) - cubeDims.y / 2);
      }
    }

  } else {
    for (let i = 0; i < yCount; i++) {
      for (let j = 0; j < xCount; j++) {
        // //random positionss
        flock[(i * xCount) + j] = new Particle(random(cubeDims.x) - cubeDims.x / 2, random(cubeDims.y) - cubeDims.y / 2, random(cubeDims.z) - cubeDims.z / 2, random(radius * 0.1, radius * 2), random(cubeDims.x) - cubeDims.x / 2, random(cubeDims.y) - cubeDims.y / 2);
      }
    }
  }
  //     } else if (checkBox[3].checked(false)){
  //  for (let i = 0; i < logoXList.length; i++) {
  //     let currPos = createVector(logoXList[i], logoYList[i], 0);
  //     let swapPos = createVector(logoXList[logoXList.length - i - 1], logoYList[logoYList.length - i - 1], 0);
  //     //logo variable
  //     flock[i] = new Particle(currPos.x - (cubeDims.x*0.75), currPos.y - cubeDims.y, currPos.z, random(30,30), swapPos.x - width * 0.25, swapPos.y - height * 0.25);
  //   } 
  //  }

  // draw logo as flock positions
  // for (let i = 0; i < logoXList.length; i++) {
  //   let currPos = createVector(logoXList[i], logoYList[i], 0);
  //   let swapPos = createVector(logoXList[logoXList.length - i - 1], logoYList[logoYList.length - i - 1], 0);
  //   //logo variable
  //   flock[i] = new Particle(currPos.x - width * 0.25, currPos.y - height * 0.25, currPos.z, random(3,3), swapPos.x - width * 0.25, swapPos.y - height * 0.25);
  // }
}