export function levelToXP(level) {
  const MULTIPLIER = 1000;
  const EXP = 2;

  if (level < 1) {
    level = 1;
  } else if (level > 99) {
    level = 99;
  }

  return MULTIPLIER * level ** EXP;
}