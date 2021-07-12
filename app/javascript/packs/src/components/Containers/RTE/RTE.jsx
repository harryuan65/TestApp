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

Trix.config.textAttributes.red = {
  style: { color: 'red' },
  parser: function(element) {
    return element.style.color === 'red'
  },
  inheritable: true
}
Array(5).fill().map((e, i)=> i + 1).forEach( i => {
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
      const actions = addCustomTextActions();
      actions.forEach(action => {
        event.target.toolbarElement.querySelector('.trix-button-group--text-tools').appendChild(action);
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
      console.log(event.key,' ', event.keyCode);
      if (event.key === ' ' && !!inputQueue[inputQueue.length - 1]) {
        const editor = trixInput.current.editor;
        const selectedRange = editor.getSelectedRange(); // [[],[]]
        const queueString = inputQueue.join('');
        switch(true) {
          case !!queueString.match(/^\#+$/):
            const length = inputQueue.length > 5 ? 5 : inputQueue.length;
            editor.setSelectedRange([selectedRange[0] - inputQueue.length, selectedRange[0]]);
            editor.deleteInDirection("backward");
            editor.activateAttribute(`heading${length}`);
            event.preventDefault(); //avoid the last space pressed
            break;
          case !!queueString.match(/^\*$/):
            editor.setSelectedRange([selectedRange[0] - 1, selectedRange[0]]);
            editor.deleteInDirection("backward");
            editor.activateAttribute(`bullet`);
            event.preventDefault(); //avoid the last space pressed
            break;
        }
        setInputQueue([]);

      } else if(event.key === 'Enter'){
        setInputQueue([]);
      } else {
        setInputQueue([...inputQueue, event.key]);
      }

      // console.log(inputQueue);
    }
    if(typeof content === 'string' && trixInput.current ) {
      if (!initialized) initialize();
      window.addEventListener('keydown', keydownHandler);
    }
    return () => window.removeEventListener('keydown', keydownHandler);
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
