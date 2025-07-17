import { initGame } from './game';

const container = document.getElementById('game-container');
if (container) {
  initGame(container);
} else {
  console.error('No #game-container element found');
}
