
// Given a string, returns a random, stable rgb color representing that string. 
export default function(str) {
  if (!str) str = ''

  var chs = str.split('')
  
  // between 0 and 2. The color that gets set to 'FF'.
  let nocol = 0;
  // between 0 - 8. choose a value for color 1 (jump in blocks of 32)
  let col1 = 0;
  let col2 = 0;

  for (let ch of chs) {
    let num = ch.charCodeAt(0)
    
    nocol = ((nocol + num) ^ 3) % 3;
    col1 = ((col1 + num) ^ 5) % 9;
    col2 = ((col2 + num) ^ 7) % 9;
  }

  let r = 0, g = 0, b = 0;
  switch (nocol){
    case 0:
      r = 0;
      g = Math.min(col1 * 32, 255);
      b = Math.min(col2 * 32, 255);
      break;
    case 1:
      r = Math.min(col1 * 32, 255);
      g = 0;
      b = Math.min(col2 * 32, 255);
      break;
    case 2:
      r = Math.min(col1 * 32, 255);
      g = Math.min(col2 * 32, 255);
      b = 0;
      break;
  }

  return (r << 24) + (g << 16) + (b << 8) + 0xff;
}