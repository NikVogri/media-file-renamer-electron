export const addZeroPrefixToNumber = (num: number) =>
  num > 9 ? num.toString() : `0${num}`;
