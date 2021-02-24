import React from 'react';
import { render } from 'react-dom';
import App from './App';

const target = window.document.createElement('div');
target.style.display = 'content';
window.document.body.appendChild(target);

render(<App />, target);