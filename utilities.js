const all = (selector, container = document) =>
  Array.from(container.querySelectorAll(selector));
const one = (selector, container) => all(selector, container).shift();

const element = tag => document.createElement(tag);
const create = (tag = "div", options = {}) => {
  const e = element(tag);
  Object.entries(options).forEach(([attr, value]) =>
    e.setAttribute(attr, value)
  );
  return e;
};
const createNS = (tag = 'svg', options = {}) => {
  const e = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(options).forEach(([ attr, value ]) => (
    e.setAttribute(attr, value.toString().replace(/NaN/g, '0'))
  ));
  return e;
};
const parentOf = (element, dist = 1) => {
  let parent = element;
  while (--dist && document !== parent) {
    parent = parent.parentElement;
  }
  return parent;
};
const text = txt => document.createTextNode(txt);
const addChild = (parent, ...children) => {
  const frag = document.createDocumentFragment();
  children.forEach(child => frag.appendChild(child));
  parent.appendChild(frag);
  return parent;
};
const replaceChildren = (parent, ...children) => {
  const frag = document.createDocumentFragment();
  children.forEach(child => frag.appendChild(child));
  parent.innerHTML = "";
  parent.appendChild(frag);
  return parent;
};
const replaceElement = (element, ...children) => {
  const frag = document.createDocumentFragment();
  children.forEach(child => frag.appendChild(child));
  parentOf(element).replaceChild(frag, element);
  return parent;
};
const locale = () =>
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.userLanguage ||
      navigator.language ||
      navigator.browserLanguage ||
      "en";
const sleep = n => new Promise(res => setTimeout(res, n * 1000));
const dayMultiplier = 24 * 60 * 60 * 1000;
const strToDate = str => new Date(`${str} 12:00 UTC`);
const addDaysTo = (d, n) => new Date(d.getTime() + (n * dayMultiplier));
const fmtRealDate = d => `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
const daysBetween = s => e => {
  const [ start, end ] = [ s, e ].map(d => (
    (d instanceof Date)
      ? d.getTime()
      : (new Date(`${d} UTC-5`)).getTime()
  ));
  return Math.floor((end - start) / dayMultiplier);
};

const matrixify = txt => txt.split('\n').map(t => t.split(','));
const formatDate = date => {
  if (date.includes('/')) {
    const [m, d, y] = date.split('/');
    return `20${[y, m.padStart(2, '0'), d.padStart(2, '0')].join('-')}`;
  }
  return date;
};
const getCsv = async url => matrixify(await fetch(`${url}?rand=${(new Date()).getTime()}`).then(r => r.text()));
const monthDiff = (d1, d2) => {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}