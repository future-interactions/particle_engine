function drawUI() {

  alignSlider = createSlider(0.1, 1, 0.5, 0.1);
  alignSlider.position(14, 6);
  alignSlider.style('width', '160px');

  let alignSliderText = createElement('desc', 'Alignment');
  alignSliderText.style('color', '#ffffff');
  alignSliderText.position(18, 25);

  cohesionSlider = createSlider(0.1, 1, 0.5, 0.1);
  cohesionSlider.position(14, 56);
  cohesionSlider.style('width', '160px');

  let cohesionSliderText = createElement('desc', 'Cohesion');
  cohesionSliderText.style('color', '#ffffff');
  cohesionSliderText.position(18, 75);

  separationSlider = createSlider(0.1, 1, 0.5, 0.1);
  separationSlider.position(14, 106);
  separationSlider.style('width', '160px');

  let separationSliderText = createElement('desc', 'Separation');
  separationSliderText.style('color', '#ffffff');
  separationSliderText.position(18, 125);

  playCheck = createCheckbox('', false);
  playCheck.position(14, 155);

  flockingCheck = createCheckbox('', false);
  flockingCheck.position(14, 175);

  gravityCheck = createCheckbox('', false);
  gravityCheck.position(14, 195);

  windCheck = createCheckbox('', false);
  windCheck.position(14, 215);

  patternCheck = createCheckbox('', false);
  patternCheck.position(14, 235);

  repelCheck = createCheckbox('', false);
  repelCheck.position(14, 255);

  expandCheck = createCheckbox('', false);
  expandCheck.position(14, 275);

  contractCheck = createCheckbox('', false);
  contractCheck.position(14, 295);

  let playCheckText = createElement('desc', 'Play');
  playCheckText.style('color', '#ffffff');
  playCheckText.position(36, 157);

  let flockingCheckText = createElement('desc', 'Flocking');
  flockingCheckText.style('color', '#ffffff');
  flockingCheckText.position(36, 177);

  let gravityCheckText = createElement('desc', 'Gravity');
  gravityCheckText.style('color', '#ffffff');
  gravityCheckText.position(36, 197);

  let windCheckText = createElement('desc', 'Wind');
  windCheckText.style('color', '#ffffff');
  windCheckText.position(36, 217);

  let patternCheckText = createElement('desc', 'Pattern');
  patternCheckText.style('color', '#ffffff');
  patternCheckText.position(36, 237);

  let repelCheckText = createElement('desc', 'Repel');
  repelCheckText.style('color', '#ffffff');
  repelCheckText.position(36, 257);


  let expandCheckText = createElement('desc', 'Expand');
  expandCheckText.style('color', '#ffffff');
  expandCheckText.position(36, 277);

  let contractCheckText = createElement('desc', 'Contract');
  contractCheckText.style('color', '#ffffff');
  contractCheckText.position(36, 297);
}