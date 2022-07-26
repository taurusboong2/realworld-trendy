import React from 'react';
import ReactDOM from 'react-dom';
import { CONTAINER_CLASSNAME } from './';

const ToastPortal: React.FC = ({ children }) => {
  let container = document.querySelector(`.${CONTAINER_CLASSNAME}`);

  if (!container) {
    const containerDiv = document.createElement('div');
    containerDiv.className = CONTAINER_CLASSNAME;
    container = containerDiv;

    document.body.appendChild(container);
  }
  return ReactDOM.createPortal(children, container);
};

export default ToastPortal;
