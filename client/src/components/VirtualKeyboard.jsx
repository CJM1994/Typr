import React, { useEffect } from "react";
import Keyboard from "simple-keyboard";
import 'simple-keyboard/build/css/index.css';



function VirtualKeyboard() {

  useEffect(() => {

    const keyboard = new Keyboard({
      onChange: input => onChange(input),
      onKeyPress: button => onKeyPress(button),
      layout: {
        'default': [
          '` 1 2 3 4 5 6 7 8 9 0 - = {Backspace}',
          '{tab} q w e r t y u i o p [ ] \\',
          '{lock} a s d f g h j k l ; \' {enter}',
          '{shift} z x c v b n m , . / {shift}',
          '{space}'
        ]
      },
      display: {
        '{Backspace}': 'backspace',
        '{enter}': 'enter',
        '{tab}': 'tab',
        '{lock}': 'caps',
        '{shift}': 'shift',
        '{space}': 'space',
        'a': 'A',
        'b': 'B',
        'c': 'C',
        'd': 'D',
        'e': 'E',
        'f': 'F',
        'g': 'G',
        'h': 'H',
        'i': 'I',
        'j': 'J',
        'k': 'K',
        'l': 'L',
        'm': 'M',
        'n': 'N',
        'o': 'O',
        'p': 'P',
        'q': 'Q',
        'r': 'R',
        's': 'S',
        't': 'T',
        'u': 'U',
        'v': 'V',
        'w': 'W',
        'x': 'X',
        'y': 'Y',
        'z': 'Z'
      },
      physicalKeyboardHighlight: true,
      physicalKeyboardHighlightBgColor: "#42403E",
      physicalKeyboardHighlightTextColor: "white"
    });

    function onChange(input) {
      document.querySelector(".input").value = input;
      console.log("Input changed", input);
    }

    function onKeyPress(button) {
      console.log("Button pressed", button);
    }

  }, [])

  return (
    <section>
      <input className="input" />
      <div className="simple-keyboard"></div>
    </section>
  );

}

export default VirtualKeyboard