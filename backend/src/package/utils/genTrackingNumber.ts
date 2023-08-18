const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function genChar() {
  const idx = Math.floor(Math.random() * characters.length);
  return characters[idx];
}

function genNumber() {
  return Math.floor(Math.random() * 10);
}

export function genTrackingNumber() {
  const arr = [
    genChar(),
    genChar(),
    genNumber(),
    genNumber(),
    genNumber(),
    genNumber(),
    genChar(),
    genChar(),
  ];

  return arr.join('');
}
