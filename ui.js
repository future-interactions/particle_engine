function drawUI() {
  let left = 400;
  let leftPadding = 10;
  let top = 25;
  let sliderHeight = 20;
  let sliderSize = 135;
  let sliderLeading = 30;
  let itemRow = 1;
  let itemCol = 1;
  let textOffsetY = 22;
  let textOffsetX = 0;


  
  let uiContainer = createElement('cont', 'The Office of Future Interactions');
  let hr1 = createElement('hr', '<hr>');
  hr1.position(leftPadding + left, top * 1.25 + 3);
  top = top + 25;
  let t1 = createElement('identifier', 'Controls');
  t1.position(leftPadding * 1.5 + left, top);
  top = top + 10;
  playCheck = createCheckbox('', false);
  playCheck.position(leftPadding + left, top);

  let playCheckText = createElement('desc', 'Play (p)');
  playCheckText.position(left + sliderHeight + leftPadding + textOffsetX, top + 3);
  top = top + 10;
  let hr2 = createElement('hr', 'hi<hr>');
  hr2.position(leftPadding + left, top * 1.25 + 3);

  top = top + 35;


  let t2 = createElement('identifier', 'Flocking');
  t2.position(leftPadding * 1.5 + left, top);

  top = top + 10;
  flockingCheck = createCheckbox('', false);
  flockingCheck.position(leftPadding + left, top);
  let flockingCheckText = createElement('desc', 'Flocking (f)');
  flockingCheckText.position(left + sliderHeight + leftPadding + textOffsetX, top + 3);
  top = top + 35;
  updateCol(0);
  updateRow(0);
  alignSlider = createSlider(0.1, 1, 0.5, 0.1);
  alignSlider.position(sXpos, sYpos);
  alignSlider.size(sliderSize);
  alignSlider.style('appearance', 'none'),
    alignSlider.style('background: #ffffff');

  let alignSliderText = createElement('desc', 'Alignment');
  alignSliderText.position(sXpos + 2, sYpos + textOffsetY);

  updateCol(1);

  newSlider(1, 'align', 0, 300, 100, 1, sXpos,sYpos);

  // aPerceptionRadius = createSlider(0, 300, 100, 1);
  // aPerceptionRadius.position(sXpos, sYpos);
  // aPerceptionRadius.size(sliderSize);
  // aPerceptionRadius.style('appearance', 'none'),
  //   aPerceptionRadius.style('background: #ffffff');


  // aPerRadSliderText = createElement('desc', 'A Perception Rad = ' + aPerceptionRadius.value());
  aPerRadSliderText = createElement('desc', 'A Perception Rad = ' + sliders[1].value());

  aPerRadSliderText.position(sXpos + 2, sYpos + textOffsetY);

  updateCol(-1);
  updateRow(1);

  cohesionSlider = createSlider(0.1, 1, 0.5, 0.1);
  cohesionSlider.position(sXpos, sYpos);
  cohesionSlider.size(sliderSize);
  cohesionSlider.style('appearance', 'none'),
    cohesionSlider.style('background: #ffffff');


  let cohesionSliderText = createElement('desc', 'Cohesion');
  cohesionSliderText.position(sXpos + 2, sYpos + textOffsetY);
  updateCol(1);


  cPerceptionRadius = createSlider(0, 300, 200, 1);
  cPerceptionRadius.position(sXpos, sYpos);
  cPerceptionRadius.size(sliderSize);
  cPerceptionRadius.style('appearance', 'none'),
    cPerceptionRadius.style('background: #ffffff');


  cPerRadSliderText = createElement('desc', 'C Perception Rad = ' + cPerceptionRadius.value());
  cPerRadSliderText.position(sXpos + 2, sYpos + textOffsetY);
  updateCol(-1);
  updateRow(1);

  separationSlider = createSlider(0.1, 1, 0.5, 0.1);
  separationSlider.position(sXpos, sYpos);
  separationSlider.size(sliderSize);
  separationSlider.style('appearance', 'none'),
    separationSlider.style('background: #ffffff');

  let separationSliderText = createElement('desc', 'Separation');
  separationSliderText.position(sXpos + 2, sYpos + textOffsetY);

  updateCol(1);

  sPerceptionRadius = createSlider(0, 300, 50, 1);
  sPerceptionRadius.position(sXpos, sYpos);
  sPerceptionRadius.size(sliderSize);
  sPerceptionRadius.style('appearance', 'none'),
    sPerceptionRadius.style('background: #ffffff');

  sPerRadSliderText = createElement('desc', 'S Perception Rad = ' + sPerceptionRadius.value());
  sPerRadSliderText.position(sXpos + 2, sYpos + textOffsetY);

  top = top + 80;
  let hr3 = createElement('hr', 'hi<hr>');
  hr3.position(leftPadding + left, top * 1.25 + 3);


  gasCheck = createCheckbox('', false);
  gasCheck.position(14, 195);

  gravityCheck = createCheckbox('', false);
  gravityCheck.position(14, 215);

  windCheck = createCheckbox('', false);
  windCheck.position(14, 235);

  patternCheck = createCheckbox('', false);
  patternCheck.position(14, 255);

  halfWidthCheck = createCheckbox('', false);
  halfWidthCheck.position(14, 275);

  repelCheck = createCheckbox('', false);
  repelCheck.position(14, 295);

  expandCheck = createCheckbox('', false);
  expandCheck.position(14, 315);

  contractCheck = createCheckbox('', false);
  contractCheck.position(14, 335);



  let gasCheckText = createElement('desc', 'Gas');
  gasCheckText.position(36, 197);

  let gravityCheckText = createElement('desc', 'Gravity');
  gravityCheckText.position(36, 217);


  let windCheckText = createElement('desc', 'Wind');
  windCheckText.position(36, 237);

  let patternCheckText = createElement('desc', 'Pattern');
  patternCheckText.position(36, 257);

  let halfWidthText = createElement('desc', 'Half Width');
  halfWidthText.position(36, 277);


  let repelCheckText = createElement('desc', 'Repel');
  repelCheckText.position(36, 297);


  let expandCheckText = createElement('desc', 'Expand');
  expandCheckText.position(36, 317);

  let contractCheckText = createElement('desc', 'Contract');
  contractCheckText.position(36, 337);

  let keyControlsText = createElement('desc', 'Key Controls: <BR>c = Toggle Cursor <BR> b = Toggle Box Visibility <BR>l = Toggle Lights<BR>x = Half Size Positions<BR>r = Reset Flock<BR> s = SaveFrames (up to 2400)');
  keyControlsText.position(18, 427);

  function updateCol(n) {
    let val = n;
    itemCol += val;
    sXpos = leftPadding * itemCol + left + (sliderSize * (itemCol - 1));
  }

  function updateRow(n) {
    let val = n;
    itemRow += val;
    sYpos = (sliderHeight + sliderLeading) * (itemRow - 1) + top;
  }
  function newSlider(num, id,s, e, st, inc, x, y) {
    sliders[num] = createSlider(s,e,st,inc);
    sliders[num].id(id);
    sliders[num].position(x, y);
    sliders[num].size(sliderSize);
    sliders[num].style('appearance', 'none'),
    sliders[num].style('background: #cc9999');
  
    // let playCheckText = createElement('desc', 'Play (p)');
    // playCheckText.position(left + sliderHeight + leftPadding + textOffsetX, top + 3);
  }
}
function updateSlidersText() {
  // aPerRadSliderText.html('A Perception Rad = ' + aPerceptionRadius.value());
    aPerRadSliderText.html('A Perception Rad = ' + sliders[1].value());


  cPerRadSliderText.html('C Perception Rad = ' + cPerceptionRadius.value());
  sPerRadSliderText.html('S Perception Rad = ' + sPerceptionRadius.value());

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

  if (keyCode == 80 && playing) {
    playing = false;
    playCheck.checked(false);
  } else if (keyCode == 80 && !playing) {
    playing = true;
    playCheck.checked(true);
  }

  if (keyCode == 70 && flocking) {
    flocking = false;
    flockingCheck.checked(false);
  } else if (keyCode == 70 && !flocking) {
    flocking = true;
    flockingCheck.checked(true);
  }

  if (keyCode == 76 && lightsVisibility) {
    lightsVisibility = false;
  } else if (keyCode == 76 && !lightsVisibility) {
    lightsVisibility = true;
  }

  if (keyCode == 83 && !saveCalled) {
    saveCalled = true;
  }

  if (keyCode == 82) {
    createFlock();
  }
  if (keyCode == 88 && !halfSizeOn) {
    patternScaler = 0.5;
    halfSizeOn = true;
  } else if (keyCode == 88 && halfSizeOn) {
    patternScaler = 1;
    halfSizeOn = false;
  }

}

