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
          '` 1 2 3 4 5 6 7 8 9 0 - = {backspace}',
          '{tab} q w e r t y u i o p [ ] \\',
          '{capslock} a s d f g h j k l ; \' {enter}',
          '{shiftleft} z x c v b n m , . / {shiftright}',
          '{space}'
        ],
        'shift': [
          "~ ! @ # $ % ^ & * ( ) _ + {backspace}",
          "{tab} Q W E R T Y U I O P { } |",
          '{capslock} A S D F G H J K L : " {enter}',
          "{shiftleft} Z X C V B N M < > ? {shiftright}",
          "{space}"
        ]
      },
      display: {
        '{backspace}': 'backspace',
        '{enter}': 'enter',
        '{tab}': 'tab',
        '{capslock}': 'caps',
        '{shiftleft}': 'shift',
        '{shiftright}': 'shift',
        '{space}': 'space',
        // 'a': 'A',
        // 'b': 'B',
        // 'c': 'C',
        // 'd': 'D',
        // 'e': 'E',
        // 'f': 'F',
        // 'g': 'G',
        // 'h': 'H',
        // 'i': 'I',
        // 'j': 'J',
        // 'k': 'K',
        // 'l': 'L',
        // 'm': 'M',
        // 'n': 'N',
        // 'o': 'O',
        // 'p': 'P',
        // 'q': 'Q',
        // 'r': 'R',
        // 's': 'S',
        // 't': 'T',
        // 'u': 'U',
        // 'v': 'V',
        // 'w': 'W',
        // 'x': 'X',
        // 'y': 'Y',
        // 'z': 'Z'
      },
      physicalKeyboardHighlight: true,
      physicalKeyboardHighlightBgColor: "#42403E",
      physicalKeyboardHighlightTextColor: "white",
    });

    function onChange(input) {
      document.querySelector(".input").value = input;
      console.log("Input changed", input);
    }
    
    function onKeyPress(button) {
      console.log("Button pressed", button);
      if (button === "{shift}") handleShiftButton();
    }
    
    function handleShiftButton() {
      let currentLayout = keyboard.options.layoutName;
      let shiftToggle = currentLayout === "shift" ? "default" : "shift";
    
      keyboard.setOptions({
        layoutName: shiftToggle
      });
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