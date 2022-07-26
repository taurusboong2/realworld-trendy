import React from 'react';
import ReactDOM from 'react-dom';
import Toast from './Toast';
import { Props } from './types';

export const CONTAINER_CLASSNAME = 'boong_ui-toastContainer';

export const createToast = (config: Props) => {
  const toastElement = document.createElement('div');
  toastElement.className = 'boong_ui-toast';
  ReactDOM.render(<Toast {...config} />, toastElement);
};
