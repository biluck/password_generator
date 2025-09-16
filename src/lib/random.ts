export const choice = (value: string): string => {
  const array = new Uint32Array(1);
  const maxValidValue = Math.floor(0xffffffff / value.length) * value.length;
  do {
    crypto.getRandomValues(array);
  } while (array[0] >= maxValidValue);
  return value[array[0] % value.length];
};

export const shuffleArray = (value: string): string => {
  const array = value.split("");
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join("");
};
