import React from 'react';
import { render } from 'react-dom';
import App from './App';

const target = window.document.createElement('div');
// target.setAttribute('style', 'display: content')
target.style.display = 'contents';
window.document.body.appendChild(target);

render(<App />, target);