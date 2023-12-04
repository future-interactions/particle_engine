function drawUI() {

  alignSlider = createSlider(0.1, 1, 0.5, 0.1);
  alignSlider.position(14, 6);
  alignSlider.style('width', '160px');

  let alignSliderText = createElement('desc', 'Alignment');
  alignSliderText.style('color', '#ffffff');
  alignSliderText.position(18, 25);

  cohesionSlider = createSlider(0.1, 1, 0.5, 0.1);
  cohesionSlider.position(214, 6);
  cohesionSlider.style('width', '160px');

  let cohesionSliderText = createElement('desc', 'Cohesion');
  cohesionSliderText.style('color', '#ffffff');
  cohesionSliderText.position(218, 25);

  separationSlider = createSlider(0.1, 1, 0.5, 0.1);
  separationSlider.position(414, 6);
  separationSlider.style('width', '160px');

  let separationSliderText = createElement('desc', 'Separation');
  separationSliderText.style('color', '#ffffff');
  separationSliderText.position(418, 25);

  aPerceptionRadius = createSlider(0, 300, 100, 1);
  aPerceptionRadius.position(14, 56);
  aPerceptionRadius.style('width', '160px');

  cPerceptionRadius = createSlider(0, 300, 200, 1);
  cPerceptionRadius.position(214, 56);
  cPerceptionRadius.style('width', '160px');

  sPerceptionRadius = createSlider(0, 300, 50, 1);
  sPerceptionRadius.position(414, 56);
  sPerceptionRadius.style('width', '160px');

  aPerRadSliderText = createElement('desc', 'aPerception Rad = ' + aPerceptionRadius.value());
  aPerRadSliderText.style('color', '#ffffff');
  aPerRadSliderText.position(18, 75);


  cPerRadSliderText = createElement('desc', ' cPerception Rad = ' + cPerceptionRadius.value());
  cPerRadSliderText.style('color', '#ffffff');
  cPerRadSliderText.position(218, 75);


  sPerRadSliderText = createElement('desc', 'sPerception Rad = ' + sPerceptionRadius.value());
  sPerRadSliderText.style('color', '#ffffff');
  sPerRadSliderText.position(418, 75);

  playCheck = createCheckbox('', false);
  playCheck.position(14, 125);

  flockingCheck = createCheckbox('', false);
  flockingCheck.position(14, 175);

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

  let playCheckText = createElement('desc', 'Play');
  playCheckText.style('color', '#ffffff');
  playCheckText.position(36, 127);

  let flockingCheckText = createElement('desc', 'Flocking');
  flockingCheckText.style('color', '#ffffff');
  flockingCheckText.position(36, 177);

  let gasCheckText = createElement('desc', 'Gas');
  gasCheckText.style('color', '#ffffff');
  gasCheckText.position(36, 197);

  let gravityCheckText = createElement('desc', 'Gravity');
  gravityCheckText.style('color', '#ffffff');
  gravityCheckText.position(36, 217);


  let windCheckText = createElement('desc', 'Wind');
  windCheckText.style('color', '#ffffff');
  windCheckText.position(36, 237);

  let patternCheckText = createElement('desc', 'Pattern');
  patternCheckText.style('color', '#ffffff');
  patternCheckText.position(36, 257);

  let halfWidthText = createElement('desc', 'Half Width');
  halfWidthText.style('color', '#ffffff');
  halfWidthText.position(36, 277);


  let repelCheckText = createElement('desc', 'Repel');
  repelCheckText.style('color', '#ffffff');
  repelCheckText.position(36, 297);


  let expandCheckText = createElement('desc', 'Expand');
  expandCheckText.style('color', '#ffffff');
  expandCheckText.position(36, 317);

  let contractCheckText = createElement('desc', 'Contract');
  contractCheckText.style('color', '#ffffff');
  contractCheckText.position(36, 337);

  let keyControlsText = createElement('desc', 'Key Controls: <BR>c = Toggle Cursor <BR> b = Toggle Box Visibility <BR>l = Toggle Lights<BR>x = Half Size Positions<BR> s = SaveFrames (up to 2400)');
  keyControlsText.style('color', '#ffffff');
  keyControlsText.position(18,427);

}
function updateSlidersText() {
  aPerRadSliderText.html('aPerception Rad = ' + aPerceptionRadius.value());
  cPerRadSliderText.html('cPerception Rad = ' + cPerceptionRadius.value());
  sPerRadSliderText.html('sPerception Rad = ' + sPerceptionRadius.value());

}

