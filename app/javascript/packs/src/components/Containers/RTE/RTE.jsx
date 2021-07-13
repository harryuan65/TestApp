import React, { useState, useRef, useEffect } from 'react'
import 'trix/dist/trix.css';
import './RTE.scss';
import * as Trix from 'trix/dist/trix.js';

const addCustomTextActions = () => {
  var actions = [];
  var btn = document.createElement('button');
  btn.innerText = "RED";
  btn.classList.add("trix-button", "trix-button--icon");
  btn.dataset.trixAttribute = 'red';
  actions.push(btn);

  return actions;
}

const addCustomHeadings = () => {
  var headings = [];
  Array(3).fill().map((e, i)=> i + 2).reverse().forEach(headingNo => {
    var btn = document.createElement('button');
    btn.innerText = `H${headingNo}`;
    btn.classList.add("trix-button", "trix-button--icon", `trix-button--icon-heading-${headingNo}`);
    btn.dataset.trixAttribute = `heading${headingNo}`;
    btn.setAttribute('disabled', '');
    headings.push(btn);
  })
  return headings;
}
Trix.config.textAttributes.red = {
  style: { color: 'red' },
  parser: function(element) {
    return element.style.color === 'red'
  },
  inheritable: true
}

Array(3).fill().map((e, i)=> i + 2).forEach( i => {
  Trix.config.blockAttributes[`heading${i}`] = {
    tagName: `h${i}`,
    terminal: true,
    breakOnReturn: true,
    group: false,
  }

})
const RTE = ({ content, onChange }) => {
  const trixInput = useRef(null);
  const [inputQueue, setInputQueue] = useState([])
  const [initialized, setInitialized] = useState(false);
  const editor = <div className="trix-wrap">
    <trix-editor input="content" ref={trixInput}></trix-editor>
  </div>;


  const initialize = () => {
    trixInput.current.addEventListener('trix-initialize', (event) => {
      // let toolbar = document.getElementById('trix-toolbar-1');
      // let row2 = document.createElement('div');
      // row2.classList.add('trix-button-row');
      const actions = addCustomTextActions();
      let textAttrGroup = event.target.toolbarElement.querySelector('.trix-button-group--text-tools')
      actions.forEach(action => {
        textAttrGroup.appendChild(action);
      })
      const headings = addCustomHeadings();
      let blockAttrGroup = event.target.toolbarElement.querySelector('.trix-button-group--block-tools')
      let heading1 = blockAttrGroup.firstElementChild;
      headings.forEach(heading => {
        blockAttrGroup.insertBefore(heading, heading1.nextElementSibling);
      })
    })
    trixInput.current.addEventListener('trix-change', (event) => {
      onChange(event.target.innerHTML)
    });
    window.Trix = trixInput.current;

    setInitialized(true);
  }

  useEffect( () => {
    const keydownHandler = (event) => {
      console.log(event.key,' ', event.keyCode, ' ', [32, 192].includes(event.keyCode))
      if ([32, 192].includes(event.keyCode) && !!inputQueue[inputQueue.length - 1]) {
        const editor = trixInput.current.editor;
        const selectedRange = editor.getSelectedRange(); // [[],[]]
        const queueString = inputQueue.join('');
        switch(true) {
          case !!queueString.match(/^\#+$/):
            setInputQueue([]);
            const length = inputQueue.length > 5 ? 5 : inputQueue.length;
            editor.setSelectedRange([selectedRange[0] - inputQueue.length, selectedRange[0]]);
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
          case event.keyCode === 192 && queueString === '``':
            setInputQueue([]);
            event.preventDefault();
            editor.setSelectedRange([selectedRange[0] - 2, selectedRange[0]]);
            editor.deleteInDirection("backward");
            editor.activateAttribute('code');
            break;
        }

      }
      if(event.key === 'Enter'){
        setInputQueue([]);
      } else if((48 <= event.keyCode && event.keyCode <= 90) || [189, 190, 192].includes(event.keyCode)){
        setInputQueue([...inputQueue, event.key]);
      } else if (event.key === "Backspace"){
        const selectionLength = window.getSelection().toString().length;
        const removeLength = selectionLength > 0 ?  selectionLength : 1;
        setInputQueue([...inputQueue].slice(0, inputQueue.length - removeLength));
      }

      // console.log(inputQueue);
    }
    // const pasteHandler = (event) => {
    //   const data = (event.clipboardData || window.clipboardData).getData('text');
    //   console.log(data);
    //   if(data.match(/http:\/\/.+|https:\/\/.+/)) {
    //     event.preventDefault();
    //     const editor = trixInput.current.editor;
    //     console.log(editor.getSelectedRange());
    //     // editor.setSelectedRange(editor.getSelectedRange());
    //     editor.activateAttribute('href', data);
    //   }
    // }
    if(typeof content === 'string' && trixInput.current ) {
      if (!initialized) initialize();
      window.addEventListener('keydown', keydownHandler);
      window.addEventListener('paste', pasteHandler);
    }
    return () => {
      window.removeEventListener('keydown', keydownHandler)
      window.removeEventListener('paste', pasteHandler)
    };
  }, [content, setInputQueue]);

  return (
    <div>
      <input type="hidden" id="content" value={content || ""}/>
      {typeof content == 'string' ? editor : "Loading" }
      <div>
        {typeof content}
        {`${trixInput.current}`}
        {`${initialized}`}
      </div>
      {<div>
        <p>Listening queue: {inputQueue}</p>
        <p>Listening queue last: {inputQueue[inputQueue.length - 1]} ( null ? {`${inputQueue[inputQueue.length - 1]===null}`})</p>
      </div>}
    </div>
  )
}

export default RTE;
