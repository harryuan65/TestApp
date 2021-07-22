import React, { useState, useRef, useEffect } from "react";
import "trix/dist/trix.css";
import "./Editor.scss";
import * as Trix from "trix/dist/trix.js";

const addCustomTextActions = (trix) => {
  Trix.config.textAttributes.red = {
    style: { color: "red" },
    parser: function (element) {
      return element.style.color === "red";
    },
    inheritable: true,
  };
  var actions = [];
  var btn = document.createElement("button");
  btn.innerText = "RED";
  btn.classList.add("trix-button", "trix-button--icon");
  btn.dataset.trixAttribute = "red";
  actions.push(btn);

  let textAttrGroup = trix.toolbarElement.querySelector(
    ".trix-button-group--text-tools"
  );
  actions.forEach((action) => {
    textAttrGroup.appendChild(action);
  });
};

const addCustomHeadings = (trix) => {
  var headings = [];
  const extraHeadingIndexes = [3, 2];
  extraHeadingIndexes.forEach((headingIndex) => {
    Trix.config.blockAttributes[`heading${headingIndex}`] = {
      tagName: `h${headingIndex}`,
      terminal: true,
      breakOnReturn: true,
      group: false,
    }
    var btn = document.createElement("button");
    btn.innerText = `H${headingIndex}`;
    btn.classList.add(
      "trix-button",
      "trix-button--icon",
      `trix-button--icon-heading-${headingIndex}`
    );
    btn.dataset.trixAttribute = `heading${headingIndex}`;
    // btn.setAttribute("disabled", "");
    headings.push(btn);
  });
  let blockAttrGroup = trix.toolbarElement.querySelector(
    ".trix-button-group--block-tools"
  );
  let heading1 = blockAttrGroup.firstElementChild;
  headings.forEach((heading) => {
    blockAttrGroup.insertBefore(heading, heading1.nextElementSibling);
  });
};
const Editor = ({ content, contentChange }) => {
  const trixInput = useRef(null);
  const [inputQueue, setInputQueue] = useState([]);
  const [currentContent, setCurrentContent] = useState(content);
  const [initialized, setInitialized] = useState(false);
  const editor = (
    <div className="trix-wrap">
      <trix-editor input="content" ref={trixInput}></trix-editor>
    </div>
  );

  const initialize = () => {
    addCustomTextActions(trixInput.current);
    addCustomHeadings(trixInput.current);
    // trixInput.current.addEventListener("trix-initialize", (event) => {
    //   addCustomTextActions(trixInput.current);
    //   addCustomHeadings(trixInput.current);
    // });
    trixInput.current.addEventListener("trix-change", (event) => {
      setCurrentContent(event.target.innerHTML);
    });
    // window.Trix = trixInput.current;

    setInitialized(true);
  };

  const keydownHandler = (event) => {
    if (
      [32, 192].includes(event.keyCode) &&
      !!inputQueue[inputQueue.length - 1]
    ) {
      const editor = trixInput.current.editor;
      const selectedRange = editor.getSelectedRange(); // [[],[]]
      const queueString = inputQueue.join("");
      switch (true) {
        case !!queueString.match(/^\#+$/):
          setInputQueue([]);
          const length = inputQueue.length > 5 ? 5 : inputQueue.length;
          editor.setSelectedRange([
            selectedRange[0] - inputQueue.length,
            selectedRange[0],
          ]);
          editor.deleteInDirection("backward");
          editor.activateAttribute(`heading${length}`);
          event.preventDefault(); //avoid the last space pressed
          break;
        case queueString === "*":
          setInputQueue([]);
          editor.setSelectedRange([selectedRange[0] - 1, selectedRange[0]]);
          editor.deleteInDirection("backward");
          editor.activateAttribute(`bullet`);
          event.preventDefault(); //avoid the last space pressed
          break;
        case event.keyCode === 192 && queueString === "``":
          setInputQueue([]);
          event.preventDefault();
          editor.setSelectedRange([selectedRange[0] - 2, selectedRange[0]]);
          editor.deleteInDirection("backward");
          editor.activateAttribute("code");
          break;
      }
    }
    if (event.key === "Enter") {
      setInputQueue([]);
    } else if (
      (48 <= event.keyCode && event.keyCode <= 90) ||
      [189, 190, 192].includes(event.keyCode)
    ) {
      setInputQueue([...inputQueue, event.key]);
    } else if (event.key === "Backspace") {
      const selectionLength = window.getSelection().toString().length;
      const removeLength = selectionLength > 0 ? selectionLength : 1;
      setInputQueue(
        [...inputQueue].slice(0, inputQueue.length - removeLength)
      );
    }
  };

  useEffect(() => {
    if (!initialized) {
      initialize();
      window.addEventListener("keydown", keydownHandler);
    }
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [content, setInputQueue, trixInput]);

  useEffect(()=>{
    contentChange(currentContent);
  }, [currentContent]);
  return (
    <div>
      <input type="hidden" id="content" value={content || ""} />
      {typeof content == "string" ? editor : "Loading"}
    </div>
  );
};

export default Editor;
