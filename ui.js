function drawUI() {
  let left = 10;
  let leftPadding = 10;
  let top = 25;
  let sliderHeight = 20;
  let sliderSize = 135;
  let sliderLeading = 30;
  let textOffsetY = 22;
  let textOffsetX = 0;
  let checkBoxHeight = 12;
  let checkBoxCol = sliderSize;
  let titleSpacer = 16;
  let hrSpacer = 25;

  let uiContainer = createElement('cont', 'The Office of Future Interactions');
  top = top + hrSpacer * 0.35;

  let hr1 = createElement('hr', '<hr>');
  hr1.position(leftPadding + left, top + 3);
  top = top + titleSpacer;
  //Version
  let t0 = createElement('identifier', 'Version');
  t0.position(leftPadding * 1.5 + left, top);
  top = top + titleSpacer;
  let t0_1 = createElement('desc', 'Vaisala_3.2.2');
  t0_1.position(leftPadding * 1.5 + left, top);
  top = top + hrSpacer;

  let hr2 = createElement('hr', '<hr>');

  hr2.position(leftPadding + left, top + 3);
  top = top + titleSpacer;
  //controls
  let t1 = createElement('identifier', 'Controls');
  t1.position(leftPadding * 1.5 + left, top);
  top = top + titleSpacer;
  newCheckBox(1, 'Play (p)', 1, 1);
  newCheckBox(2, 'Export – disabled', 2, 1);
  top = top + hrSpacer;
  let hr3 = createElement('hr', '<hr>');
  hr3.position(leftPadding + left, top + 3);
  top = top + titleSpacer;

  //Mode
  let t2 = createElement('identifier', 'Mode');
  t2.position(leftPadding * 1.5 + left, top);
  top = top + titleSpacer;
  newCheckBox(3, 'Grid', 1, 1);
  // newCheckBox(4, 'Logo', 2, 1);
  top = top + checkBoxHeight;
  // newCheckBox(5, 'Random', 1, 2);
  // top = top + hrSpacer + checkBoxHeight;
  top = top + hrSpacer;

  let hr4 = createElement('hr', '<hr>');
  hr4.position(leftPadding + left, top + 3);
  top = top + titleSpacer;

  //Environment
  let t3 = createElement('identifier', 'Environment');
  t3.position(leftPadding * 1.5 + left, top);
  top = top + titleSpacer;
  newCheckBox(6, 'Show Container (c)', 1, 1);
  newCheckBox(7, 'Lights (l)', 2, 1);
  top = top + sliderLeading;
  newSlider(1, 'Width', 160, 1920, 960, 1, 1, 1);
  newSlider(2, 'Height', 90, 1080, 540, 1, 1, 2);
  newSlider(3, 'Depth', 90, 1080, 540, 0.1, 1, 3);
  top = top + (sliderHeight + sliderLeading) * 3;
  let hr5 = createElement('hr', '<hr>');
  hr5.position(leftPadding + left, top + 3);
  top = top + titleSpacer;

  //system
  let t4 = createElement('identifier', 'System');
  t4.position(leftPadding * 1.5 + left, top);
  top = top + titleSpacer;
  newSlider(4,  'Count (disabled)', 1, 3, 1, 1, 1, 1);
  newSlider(5, 'Particle Size', 0.1, 10, 5, 1, 2, 1);
  top = top + sliderLeading + sliderHeight;
  resetButton = createButton('Reset (r)');
  resetButton.style('font-size: 11px'),
    resetButton.style('border-width: 1px'),
    resetButton.style('font-family: monospace;'),
    resetButton.style('appearance', 'none'),
    resetButton.position(leftPadding * 1.25 + left, top);
  top = top + hrSpacer;

  //Behaviour
  let hr6 = createElement('hr', 'hi<hr>');
  hr6.position(leftPadding + left, top + 3);
  top = top + titleSpacer;
  let t5 = createElement('identifier', 'Behaviour');
  t5.position(leftPadding * 1.5 + left, top);
  top = top + titleSpacer;
  newCheckBox(8, 'Flocking (f)', 1, 1);

  // flockingCheck = createCheckbox('', false);
  // flockingCheck.position(leftPadding + left, top);
  // let flockingCheckText = createElement('desc', 'Flocking (f)');
  // flockingCheckText.position(left + sliderHeight + leftPadding + textOffsetX, top + 3);
  top = top + sliderLeading;

  newSlider(6, 'Align', 0.1, 1, 0.5, 0.1, 1, 1);
  newSlider(7, 'A Perception', 0, 300, 100, 1, 2, 1);
  newSlider(8, 'Cohesion', 0.1, 1, 0.4, 0.1, 1, 2);
  newSlider(9, 'C Perception', 0, 300, 200, 1, 2, 2);
  newSlider(10, 'Separation', 0.1, 1, 0.5, 0.1, 1, 3);
  newSlider(11, 'S Perception', 0, 300, 50, 1, 2, 3);

  top = top + (sliderHeight + sliderLeading) * 3;
  newCheckBox(9, 'Gas', 1, 1);
  top = top + sliderLeading;
  newSlider(12, 'Gas Agitation', 0, 300, 50, 1, 1, 1);

  top = top + sliderHeight + sliderLeading;
  newCheckBox(10, 'Wind', 1, 1);
  top = top + sliderLeading;
  newSlider(13, 'Wind Speed', 0, 300, 50, 1, 1, 1);
  top = top + sliderHeight + sliderLeading;
  newCheckBox(11, 'Gravity', 1, 1);
  top = top + sliderLeading;
  newSlider(14, 'Gravity Strength', 0, 300, 50, 1, 1, 1);
  top = top + sliderHeight + sliderLeading;
  newCheckBox(12, 'Repel', 1, 1);
  top = top + checkBoxHeight;
  top = top + checkBoxHeight;

  // newCheckBox(13, 'Repel (live)', 1, 1);
  // top = top + hrSpacer;


  // gasCheck = createCheckbox('', false);
  // gasCheck.position(14, 195);

  // gravityCheck = createCheckbox('', false);
  // gravityCheck.position(14, 215);

  // windCheck = createCheckbox('', false);
  // windCheck.position(14, 235);

  // patternCheck = createCheckbox('', false);
  // patternCheck.position(14, 255);

  // halfWidthCheck = createCheckbox('', false);
  // halfWidthCheck.position(14, 275);

  // repelCheck = createCheckbox('', false);
  // repelCheck.position(14, 295);

  // expandCheck = createCheckbox('', false);
  // expandCheck.position(14, 315);

  // contractCheck = createCheckbox('', false);
  // contractCheck.position(14, 335);

  // ranPosCheck = createCheckbox('', false);
  // ranPosCheck.position(14, 355);

  // let gasCheckText = createElement('desc', 'Gas');
  // gasCheckText.position(36, 197);

  // let gravityCheckText = createElement('desc', 'Gravity');
  // gravityCheckText.position(36, 217);


  // let windCheckText = createElement('desc', 'Wind');
  // windCheckText.position(36, 237);

  // let patternCheckText = createElement('desc', 'Pattern');
  // patternCheckText.position(36, 257);

  // let halfWidthText = createElement('desc', 'Half Width');
  // halfWidthText.position(36, 277);


  // let repelCheckText = createElement('desc', 'Repel');
  // repelCheckText.position(36, 297);


  // let expandCheckText = createElement('desc', 'Expand');
  // expandCheckText.position(36, 317);

  // let contractCheckText = createElement('desc', 'Contract');
  // contractCheckText.position(36, 337);

  // let keyControlsText = createElement('desc', 'Key Controls: <BR>c = Toggle Cursor <BR> b = Toggle Box Visibility <BR>l = Toggle Lights<BR>x = Half Size Positions<BR>r = Reset Flock<BR> s = SaveFrames (up to 2400)');
  // keyControlsText.position(18, 427);

  // function updateCol(n) {
  //   let val = n;
  //   itemCol += val;
  //   sXpos = leftPadding * itemCol + left + (sliderSize * (itemCol - 1));
  // }

  // function updateRow(n) {
  //   let val = n;
  //   itemRow += val;
  //   sYpos = (sliderHeight + sliderLeading) * (itemRow - 1) + top;
  // }
  function newSlider(num, id, s, e, st, inc, col, row) {
    sliders[num] = createSlider(s, e, st, inc);
    sliders[num].id(id);
    let x = leftPadding * col + left + (sliderSize * (col - 1));
    let y = (sliderHeight + sliderLeading) * (row - 1) + top;
    sliders[num].position(x, y);
    sliders[num].size(sliderSize);
    sliders[num].style('appearance', 'none'),
      sliders[num].style('background: #eeeeee');
    sliders[num].style('border-style: solid');
    sliders[num].style('border-width: 1px');

    sliderText[num] = createElement('desc', id + " = " + sliders[num].value());
    sliderText[num].position(x + 2, y + textOffsetY);
  }
  function newCheckBox(num, id, col, row) {
    checkBox[num] = createCheckbox('', false);
    let x = leftPadding * col + left + ((col - 1) * checkBoxCol);
    let y = top + (row - 1) * checkBoxHeight;
    checkBox[num].position(x, y);
    checkBoxText[num] = createElement('desc', id);
    checkBoxText[num].position(x + sliderHeight, y + 4);
  }
}
function updateSlidersText() {
  for (let i = 1; i < sliders.length; i++) {
    sliderText[i].html(sliders[i].id() + " = " + sliders[i].value());
  }
}

function keyPressed() {
  // if (keyCode == 67 && cursorVisibility) {
  //   noCursor();
  //   cursorVisibility = false;
  // } else if (keyCode == 67 && !cursorVisibility) {
  //   cursor();
  //   cursorVisibility = true;
  // }

  if (keyCode == 67 && boxVisibility) {
    boxVisibility = false;
    checkBox[6].checked(false);
  } else if (keyCode == 67 && !boxVisibility) {
    boxVisibility = true;
    checkBox[6].checked(true);

  }

  if (keyCode == 80 && playing) {
    playing = false;
    checkBox[1].checked(false);
  } else if (keyCode == 80 && !playing) {
    playing = true;
    checkBox[1].checked(true);
  }

  if (keyCode == 70 && flocking) {
    flocking = false;
    checkBox[8].checked(false);
  } else if (keyCode == 70 && !flocking) {
    flocking = true;
    checkBox[8].checked(true);
  }

  if (keyCode == 76 && lightsVisibility) {
    lightsVisibility = false;
    checkBox[7].checked(false);

  } else if (keyCode == 76 && !lightsVisibility) {
    lightsVisibility = true;
    checkBox[7].checked(true);

  }

  if (keyCode == 69 && !saveCalled) {
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

