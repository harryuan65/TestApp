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

const RTE = ({ content, onChange }) => {
  const trixInput = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const editor = <div className="trix-wrap">
    <trix-editor input="content" ref={trixInput}></trix-editor>
  </div>;

  useEffect( () => {
    if(content !== null && trixInput.current && !initialized) {
      trixInput.current.addEventListener('trix-initialize', (event) => {
        const actions = addCustomTextActions();
        actions.forEach(action => {
          event.target.toolbarElement.querySelector('.trix-button-group--text-tools').appendChild(action);
        })
      })
      trixInput.current.addEventListener('trix-change', (event) => {
        onChange(event.target.innerHTML)
      });
      setInitialized(true);
    }
  }, [content]);
  return (
    <div>
      <input type="hidden" id="content" value={content || ""}/>
      {content ? editor : "Loading"}
    </div>
  )
}

export default RTE;
