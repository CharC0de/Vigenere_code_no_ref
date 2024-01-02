const vigenere = (input, key, isDecrypt) => {
  //use of alphabet array to use index values as basis for calculation of encrypted and decrypted value
  const alpha = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  //all other given strings are turned into arrays to easily make use of iterative functions
  inputArr = input.split("");
  //word detector(regular expression) since sentences could contain non alphabetical character/s
  wordDetector = /\w/i;
  //increment is used increase value to increase if the character of an array is
  increment = 0;

  //KEY UTILIZATION
  //create an array of repeating characters of key for input: hello, new world!! key: apple, app leapp!!
  keyArr = input.split("").map((char) => {
    if (wordDetector.test(char)) {
      //if character is alphabetical then process happens
      //increment % array length will allow iteration on key array to work without going out of bounds
      //because modulo is a division that tries to get the remainder
      //therefore the divisor of a modulo for arrays is its array length
      //as soon an index is equal to array length it will go back to 0 (the start of the array)
      //it works in any positive values because it is a division and no matter how big the value the dividend will divide it until it finds a remainder or 0
      // basically no matter how big the value of the expression is, modulo will just use it to go back to start or the overflowing/underflowing index value of the array
      //example:
      //overflow:
      //if max index: 3 and current index: 4 current index % max index + 1 = 0 which is the start of the array
      //if max index: 3 and current index: 5 current index % max index + 1 = 1 which is the overflow value/modulo remainder of the array
      //underflow:
      //if max index: 3 and current index: 1 current index % max index + 1 = 1 which is the underflowing index
      //tolowercase is added to equate with the lowercase alphabet
      return key.toLowerCase()[increment++ % key.length];
    }

    return char;
  });
  console.log(keyArr.join(""));
  //ENCRYPTION / DECRYPTION
  return inputArr
    .map((char, i) => {
      if (wordDetector.test(char) && !isDecrypt) {
        //encryption calculation
        //(index of input character in alphabet + index of keyArr character in alphabet array) % alphabet array length
        if (char === char.toUpperCase()) {
          char = char.toLowerCase();
          sum = alpha.indexOf(char) + alpha.indexOf(keyArr[i]);
          return alpha[sum % alpha.length].toUpperCase();
        }
        sum = alpha.indexOf(char) + alpha.indexOf(keyArr[i]);
        return alpha[sum % alpha.length];
      } else if (wordDetector.test(char) && isDecrypt) {
        //((index of input character in alphabet - index of keyArr character in alphabet array)+ alphabet array length) % alphabet array length
        //for decryptor + array length is needed to allow decrement from max index if index is lower than zero % array length is still needed since index difference can still be positve
        //note the while loop gives assurance that index difference that are  equal or greater than -array.length will still be dealt with
        if (char === char.toUpperCase()) {
          char = char.toLowerCase();
          diff = alpha.indexOf(char) - alpha.indexOf(keyArr[i]) + alpha.length;
          res = diff;
          while (res < 0) {
            res += alpha.length;
          }
          return alpha[res % alpha.length].toUpperCase();
        }
        diff = alpha.indexOf(char) - alpha.indexOf(keyArr[i]) + alpha.length;
        res = diff;
        while (res < 0) {
          res += alpha.length;
        }
        return alpha[res % alpha.length];
      } else {
        return char;
      }
    })
    .join("");
};
//decryption
console.log(
  vigenere(
    (input =
      "Ucxgirhxec ou Hnmecrp ens Ipghcdwsgn,,, dq Wojisirc Esmlxeamnth...."),
    (key = "apple"),
    (isDecrypt = true)
  )
);
//encryption
console.log(
  vigenere(
    (input =
      "University of Science and Technology,,, of Southern Philippines...."),
    (key = "apple"),
    (isDecrypt = false)
  )
);
