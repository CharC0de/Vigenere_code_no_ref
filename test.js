let key = "z";
const alpha = "abcdefghijklmnopqrstuvwxyz";

let input = "zzzzzzzzzzzzzzzzzzz";

let i = 0;
let decrypt = false;

keyString = input
  .split("")
  .map((char) => {
    if (/\w/i.test(char)) {
      i = i === key.length ? 0 : i;
      let keyVal = key[i];
      ++i;
      return keyVal;
    }
    return char;
  })
  .join("");

console.log(
  input
    .split("")
    .map((char, i) =>
      /\w/i.test(char) && !decrypt
        ? alpha.split("")[
            alpha.indexOf(char.toLowerCase()) +
              alpha.indexOf(keyString.split("")[i].toLowerCase()) >
            alpha.length
              ? alpha.indexOf(char.toLowerCase()) +
                alpha.indexOf(keyString.split("")[i].toLowerCase()) -
                alpha.length
              : alpha.indexOf(char.toLowerCase()) +
                alpha.indexOf(keyString.split("")[i].toLowerCase())
          ]
        : /\w/i.test(char) && decrypt
        ? alpha.split("")[
            alpha.indexOf(char.toLowerCase()) -
              alpha.indexOf(keyString.split("")[i].toLowerCase()) <
            0
              ? alpha.indexOf(char.toLowerCase()) -
                alpha.indexOf(keyString.split("")[i].toLowerCase()) +
                alpha.length
              : alpha.indexOf(char.toLowerCase()) -
                alpha.indexOf(keyString.split("")[i].toLowerCase())
          ]
        : char
    )
    .join("")
);

console.log(alpha.indexOf(43));
