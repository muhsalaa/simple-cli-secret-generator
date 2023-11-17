const CryptoJs = require("crypto-js");
const sha256 = require("crypto-js/sha256.js");
const Base64 = require("crypto-js/enc-base64.js");
// import Utf8 from "crypto-js/enc-utf8";

// Utf8.parse;
function encrypto(plainText) {
  const x = {
    h: "!",
    a: "@",
    i: "#",
    u: "$",
    e: "%",
    o: "&",
  };

  const SECRET_1 = "somesecretkey";
  const SECRET_2 = "somesecretkey";
  const SECRET_3 = "somesecretkey";
  // add more as your wish
  // const SECRET_4 = "...";

  const c = sha256(SECRET_1 + plainText);
  const d = Base64.stringify(c);
  const e = d.slice(4, 24);
  const f = e.split("").reverse().join("");
  const g = sha256(c + f + SECRET_2);
  const h = sha256(g + SECRET_3);
  const i = Base64.stringify(g /* + SECRET_4 */);
  const j = i.replace(/[\W_]+/g, "");

  let f2 = "";
  i.split("").forEach((e) => {
    const y = x[e] || e;
    f2 += y;
  });

  return f2;
}

module.exports = encrypto;
