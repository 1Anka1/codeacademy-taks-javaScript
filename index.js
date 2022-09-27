// Access HTML elements
const refs = {
  doorImage1: document.getElementById('door1'),
  doorImage2: document.getElementById('door2'),
  doorImage3: document.getElementById('door3'),
  startButton: document.getElementById('start'),
};

let botDoorPath =
  'https://content.codecademy.com/projects/chore-door/images/robot.svg';
let beachDoorPath =
  'https://content.codecademy.com/projects/chore-door/images/beach.svg';
let spaceDoorPath =
  'https://content.codecademy.com/projects/chore-door/images/space.svg';
let closedDoorPath =
  'https://content.codecademy.com/projects/chore-door/images/closed_door.svg';

let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let currentlyPlaying = true;

// Define game logic to check doors, progress game, end game, and choose a random chore door

refs.doorImage1.onclick = () => {
  if (currentlyPlaying && isClicked(refs.doorImage1)) {
    refs.doorImage1.src = openDoor1;
    playDoor(refs.doorImage1);
  }
};

refs.doorImage2.onclick = () => {
  if (currentlyPlaying && isClicked(refs.doorImage2)) {
    refs.doorImage2.src = openDoor2;
    playDoor(refs.doorImage2);
  }
};

refs.doorImage3.onclick = () => {
  if (currentlyPlaying && isClicked(refs.doorImage3)) {
    refs.doorImage3.src = openDoor3;
    playDoor(refs.doorImage3);
  }
};

refs.startButton.onclick = () => {
  if (currentlyPlaying === false) {
    startRound();
  }
};
const isClicked = door => {
  if (door.src === closedDoorPath) {
    return true;
  } else {
    return false;
  }
};
const isBot = door => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
};
const gameOver = status => {
  const { startButton } = refs;
  const winMessage = 'You win! Play again?';
  const losingMessage = 'Game over! Play again?';

  if (status === 'win') {
    startButton.innerHTML = winMessage;
  } else {
    startButton.innerHTML = losingMessage;
  }
  currentlyPlaying = false;
};

const playDoor = door => {
  numClosedDoors -= 1;
  if (numClosedDoors === 0) {
    gameOver('win');
  } else if (isBot(door)) {
    gameOver();
  }
};

const randomChoreDoorGenerator = () => {
  let choreDoor = Math.floor(Math.random() * numClosedDoors);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1) {
    openDoor1 = beachDoorPath;
    openDoor2 = botDoorPath;
    openDoor3 = spaceDoorPath;
  } else {
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
    openDoor3 = botDoorPath;
  }
};
const startRound = () => {
  const { doorImage1, doorImage2, doorImage3, startButton } = refs;

  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  currentlyPlaying = true;
  startButton.innerHTML = 'Good Luck!';
  randomChoreDoorGenerator();
};

startRound();
