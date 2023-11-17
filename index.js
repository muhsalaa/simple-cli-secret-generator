#!/usr/bin/env node

const read = require("read");
const clipboard = require("clipboardy");
const encrypto = require("./crypto.js");
const isWsl = require("is-wsl");
const { exec } = require("child_process");

read(
  { prompt: "Insert String: ", replace: "*", silent: true },
  function (er, password) {
    const pass = encrypto(password);

    // wsl only
    if (isWsl) {
      exec(`echo '${pass}' | clip.exe`, (err, stdout, stderr) => {
        if (err) {
          //some err occurred
          console.error(err);
        } else {
          // the *entire* stdout and stderr (buffered)
          console.log("secret copied to clipboard!");
        }
      });
    } else {
      clipboard
        .write(pass)
        .then(() => {
          console.log("secret copied to clipboard!");
        })
        .catch((err) => console.log(err));
    }
  }
);
