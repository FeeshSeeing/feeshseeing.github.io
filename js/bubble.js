// Bubble JS is from https://codepen.io/cbolson/pen/VwNgyWv

const containerEl = document.querySelector("#fish-tank");
const BUBBLES_NUM = 35;
const BUBBLES_WIDTH_MIN = 1;
const BUBBLES_WIDTH_MAX = 3;
const BUBBLES_MAX_POP = 45;
const BUBBLES_SPEED_MIN = 1000;
const BUBBLES_SPEED_MAX = 4000;
const XPOSITIONS = [20, 25, 50, 65, 66];
const HORIZONTAL_MOVEMENT_RANGE = 10;
const BUBBLES_DELAY = 100;
let generatedBubbles = 0;

// Function to generate a new bubble
function generateBubble() {
  const bubble = document.createElement("bubble");
  bubble.className = "bubble";

  // random size
  const radius = generateRandom(BUBBLES_WIDTH_MIN, BUBBLES_WIDTH_MAX);
  bubble.style.width = `${radius}0px`;
  bubble.style.height = `${radius}0px`;

  // random X position from defined values
  const randomIndex = generateRandom(0, XPOSITIONS.length);
  const x = XPOSITIONS[randomIndex];
  bubble.style.left = `${x}%`;

  // Random horizontal movement
  const horizontalMovement = generateRandom(
    -HORIZONTAL_MOVEMENT_RANGE,
    HORIZONTAL_MOVEMENT_RANGE
  );
  bubble.style.setProperty("--horizontal-movement", horizontalMovement);

  // random animation
  const floatDuration = generateRandom(BUBBLES_SPEED_MIN, BUBBLES_SPEED_MAX);
  const bubblesHeight = containerEl.offsetHeight - 50; // offest for bottom
  const popDistance = generateRandom(bubblesHeight - 30, bubblesHeight);
  bubble.style.animationDuration = `${floatDuration}ms`;
  bubble.style.setProperty("--pop", `${popDistance}px`);

  // animation end  - remove the bubble and generate a new one
  bubble.addEventListener("animationend", () => {
    containerEl.removeChild(bubble);
    generatedBubbles--;
    if (generatedBubbles < BUBBLES_NUM) {
      generateBubble();
    }
  });

  containerEl.append(bubble);
  generatedBubbles++;
}

// render initial bubbles
for (let i = 0; i < BUBBLES_NUM; i++) {
  setTimeout(generateBubble, i * BUBBLES_DELAY);
}

// utility - random number between values
function generateRandom(min = 0, max = 100) {
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;
  return rand;
}
