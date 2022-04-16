import React, { useEffect } from "react";
import Keyboard from "simple-keyboard";
import 'simple-keyboard/build/css/index.css';
import './VirtualKeyboard.scss';

// Useful sandbox for testing keyboard component and viewing options
// https://codesandbox.io/s/n5mllkkmyl?file=/src/index.js

function VirtualKeyboard() {

  useEffect(() => {

    const keyboard = new Keyboard({
      // onChange: input => onChange(input),
      // onKeyPress: button => onKeyPress(button),
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
        ],
        'capslock': [
          '` 1 2 3 4 5 6 7 8 9 0 - = {backspace}',
          '{tab} Q W E R T Y U I O P [ ] \\',
          '{capslock} A S D F G H J K L ; \' {enter}',
          '{shiftleft} Z X C V B N M , . / {shiftright}',
          '{space}'
        ]
      },
      display: {
        '{backspace}': 'backspace ⌫',
        '{enter}': 'enter ↵',
        '{tab}': 'tab',
        '{capslock}': 'caps lock ⇪',
        '{shiftleft}': 'shift ⇧',
        '{shiftright}': 'shift ⇧',
        '{space}': 'space',
      },
      physicalKeyboardHighlight: true,
      physicalKeyboardHighlightPress: true,
      physicalKeyboardHighlightBgColor: "#42403E",
      physicalKeyboardHighlightTextColor: "white",
      // debug: true
    });

    const keyboardControlPad = new Keyboard(".simple-keyboard-control", {
      layout: {
        default: [
          "{prtscr} {scrolllock} {pause}",
          "{insert} {home} {pageup}",
          "{delete} {end} {pagedown}"
        ]
      }
    });

    const keyboardArrows = new Keyboard(".simple-keyboard-arrows", {
      layout: {
        default: ["{arrowup}", "{arrowleft} {arrowdown} {arrowright}"]
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === 'Shift') enableShiftMode(event);
      if (event.key === "CapsLock") toggleCapsMode(event);
    })

    document.addEventListener("keyup", (event) => {
      if (event.key === "Shift") disableShiftMode(event);
    });

    function enableShiftMode(event) {
      keyboard.setOptions({
        layoutName: "shift"
      });

      highlightButton(event);
    }

    function disableShiftMode(event) {
      let capsLockIsOn = event.getModifierState("CapsLock");
      /**
       * If caps is on set back to caps, set to default otherwise
       */
      if (capsLockIsOn) {
        keyboard.setOptions({
          layoutName: "capslock"
        });
      } else {
        keyboard.setOptions({
          layoutName: "default"
        });
      }

      unhighlightButton(event);
    }

    function toggleCapsMode(event) {
      let currentLayout = keyboard.options.layoutName;
      /**
       * If currentLayout is default, set to caps, and vice versa
       */
      let capsToggle = currentLayout === "default" ? "capslock" : "default";

      keyboard.setOptions({
        layoutName: capsToggle
      });

      if (event) {
        highlightButton(event);
      }
    }

    function highlightButton(event) {
      let layoutKeyName = keyboard.physicalKeyboard.getSimpleKeyboardLayoutKey(
        event
      );

      let buttonElement =
        keyboard.getButtonElement(layoutKeyName) ||
        keyboard.getButtonElement(`{${layoutKeyName}}`);

      /**
       * Highlighting that key manually...
       */
      buttonElement.style.background = "#42403E";
      buttonElement.style.color = "white";

      console.log(buttonElement);
    }

    function unhighlightButton(event) {
      let layoutKeyName = keyboard.physicalKeyboard.getSimpleKeyboardLayoutKey(
        event
      );

      let buttonElement =
        keyboard.getButtonElement(layoutKeyName) ||
        keyboard.getButtonElement(`{${layoutKeyName}}`);

      /**
       * Highlighting that key manually...
       */
      buttonElement.removeAttribute("style");

      console.log(buttonElement);
    }

  }, [])

  return (
    <section>
      <div class="keyboardContainer">
        <div class="simple-keyboard simple-keyboard-main"></div>
        <div class="controlArrows">
          <div class="simple-keyboard-control"></div>
          <div class="simple-keyboard-arrows"></div>
        </div>
      </div>
    </section>
  );

}

export default VirtualKeyboard