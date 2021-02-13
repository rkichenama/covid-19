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
const countrySources = {
  stJohns: 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv',
  owid: 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/ecdc/total_deaths.csv',
};
const usSources = {
  nyt: 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv'
};

let data = {};
const Deaths = {};
const Cases = {};
const Ratio = {};

const matrixify = txt => txt.split('\n').map(t => t.split(','));
const formatDate = date => {
  if (date.includes('/')) {
    const [m, d, y] = date.split('/');
    return `20${[y, m.padStart(2, '0'), d.padStart(2, '0')].join('-')}`;
  }
  return date;
};
const getCsv = async url => matrixify(await fetch(`${url}?rand=${(new Date()).getTime()}`).then(r => r.text()));

const states = {
  'California': 'ca',
  'Florida': 'fl',
  'Texas': 'tx',
  'New York': 'ny',
};
const baseObj = Object.values(states).reduce((t, c) => ({
  ...t, [c]: 0
}), { us: 0 });
const fromUsSources = async () => {
  await Object.entries(usSources)
    .reduce(
      async (p, [k, v]) => {
        const t = {};
        const [columns, ...rows] = await getCsv(v);
        const dateCol = columns.findIndex(v => /^date$/i.test(v));
        const stateCol = columns.findIndex(v => /^state$/i.test(v));
        const casesCol = columns.findIndex(v => /^cases$/i.test(v));
        const deathsCol = columns.findIndex(v => /^deaths$/i.test(v));
        rows.forEach(row => {
          const date = formatDate(row[dateCol]);
          const state = row[stateCol];
          const cases = Number(row[casesCol]);
          const deaths = Number(row[deathsCol]);
          if (!t[date]) {
            t[date] = {
              deaths: { ...baseObj },
              cases: { ...baseObj }
            };
          }
          t[date].deaths.us += deaths;
          t[date].cases.us += cases;
          const st = states[state];
          if (st) {
            t[date].deaths[st] = deaths;
            t[date].cases[st] = cases;
          }
        });
        const datum = await p;
        const [ ds, cs ] = Object.entries(t)
          .reduce(([ d, c ], [key, { deaths, cases }]) => {
            d[key] = deaths;
            c[key] = cases;
            return [ d, c ];
          }, [ {}, {} ]);
        datum[k] = ds;
        Cases[k] = cs;
        Deaths[k] = ds;

        return Promise.resolve(datum);
      },
      Promise.resolve(data)
    );
};

const calculateRatios = () => {
  const series = Object.values(states);
  Object.entries(data)
    .forEach(([source, dates]) => {
      const ratio = {};
      Object.keys(dates)
        .forEach(day => {
          const weekAgo = fmtRealDate(addDaysTo(strToDate(day), -7));
          const weeksAgo = fmtRealDate(addDaysTo(strToDate(day), -14));
          if (dates[weeksAgo]) {
            ratio[day] = series.reduce((t, c) => ({
              ...t,
              [c]: [
                Deaths[source][day][c] ? Cases[source][weekAgo][c] / Deaths[source][day][c] : 0,
                Deaths[source][day][c] ? Cases[source][weeksAgo][c] / Deaths[source][day][c] : 0,
              ]
            }), { us: [
              Deaths[source][day].us ? Cases[source][weekAgo].us / Deaths[source][day].us : 0,
              Deaths[source][day].us ? Cases[source][weeksAgo].us / Deaths[source][day].us : 0,
            ] });
          }
        });
      Ratio[source] = ratio;
    });
};

const fromCountrySources = async () => {
  await Object.entries(countrySources)
    .forEach(
      async ([k, v]) => {
        const t = {};
        const datum = await getCsv(v);
        const [columns] = datum;
        if (columns.findIndex(v => /^date$/i.test(v)) >= 0) {
          await fromDatesAsRows(k, datum)
        } else {
          await fromDatesAsColumns(k, datum);
        }
      }
    );
};

const fromDatesAsColumns = async (src, datum) => {
  const [columns, ...rest] = datum;
  const countryCol = columns.findIndex(v => /country/i.test(v));
  const datesStart = columns.findIndex(v => Number(v[0]));
  const rows = rest.reduce((t, row) => {
    if (/^(us|united states)$/i.test(row[countryCol])) {
      t.push(row.slice(datesStart))
    }
    return t;
  }, []);
  data[src] = rows.reduce(
    (t, v) => {
      v.forEach((v, i) => {
        const date = formatDate(columns[datesStart + i]);
        if (!t[date]) {
          t[date] = { us: 0, ny: 0 };
        }
        t[date].us += Number(v);
      });
      return t;
    },
    {}
  );
};

const fromDatesAsRows = async (src, datum) => {
  const [columns, ...rows] = datum;
  const dateCol = columns.findIndex(v => /^date$/i.test(v));
  const countryCol = columns.findIndex(v => /^(us|united states)$/i.test(v));

  data[src] = rows.reduce(
    (t, row) => {
      const date = formatDate(row[dateCol]);
      const deaths = Number(row[countryCol]);
      if (!t[date]) {
        t[date] = { us: 0, ny: 0 };
      }
      t[date].us += deaths;
      return t;
    },
    {}
  );
};

let useLogScaleY = true;
const linearYScale = (100000 / 7);
const logScale = (value, fromEdge = 20, maxX = 400, maxY = 400) => {
  if (!value) { return 0; }
  const multiplier = ((maxY - fromEdge) / ySpan);
  if (useLogScaleY) {
    return ( Math.log10(value) * multiplier);
  }
  return (value / linearYScale) * multiplier;
}

let xMonths = 7;
const xSpan = () => xMonths * 30;
let ySpan = 7;

const createGrid = (_, fromEdge = 20, maxX = 400, maxY = 400) => {
  all('.demo svg')
    .forEach(svg => {
      replaceChildren(
        svg,
        addChild(
          createNS('g', { class: 'axises' }),
          createNS('line', {
            class: 'grid',
            y1: (maxY - fromEdge),
            y2: (maxY - fromEdge),
            x1: fromEdge,
            x2: maxX
          }),
          createNS('line', {
            class: 'grid',
            x1: fromEdge,
            x2: fromEdge,
            y1: 0,
            y2: (maxY - fromEdge)
          }),
          addChild(
            createNS('g'),
            ...(
              Array.from({ length: ySpan })
                .map((_, i) => {
                  const scaler = (maxY - fromEdge) / ySpan;
                  const y = (maxY - fromEdge) - ((i + 1) * scaler);
                  return addChild(
                    createNS('g'),
                    createNS('line', {
                      class: 'grid-line',
                      x1: 0,
                      x2: maxX,
                      y1: y,
                      y2: y
                    }),
                    addChild(
                      createNS('text', { x: 0, y: y + 16 }),
                      text(`${Math.floor(useLogScaleY ? Math.pow(10, i + 1) : (i + 1) * linearYScale).toLocaleString()}`)
                    )
                  )
                })
            ),
            ...(
              Array.from({ length: xSpan() / 14 })
                .map((_, i) => {
                  const scaler = (maxX - fromEdge) / xSpan();
                  const x = fromEdge + ((i + 1) * 14 * scaler);
                  return addChild(
                    createNS('g'),
                    createNS('line', {
                      class: 'grid-line',
                      x1: x,
                      x2: x,
                      y1: 0,
                      y2: maxY
                    }),
                    addChild(
                      createNS('text', { x: x - 32, y: maxY }),
                      text(`+${((i + 1) * 14).toString().padStart(3, '0')}`)
                    )
                  );
                })
            ),
          )
        )
      );
    });
};

const createPolylines = (key) => (name, series, startDate) => {
  const fromStart = daysBetween(startDate);
  const entries = Object.entries(series)
    .filter(([ d ]) => fromStart(d) >= 0);
  const xOffset = fromStart(entries[0][0]);
  const points = entries.map(([, v]) => v);
  return (svg, fromEdge = 20, maxX = 400, maxY = 400) => {
    addChild(
      svg,
      createNS('polyline', {
        fill: 'none',
        class: `${name} ${key}`,
        points: points.map(({ [key]: y }, x) => `${
          fromEdge + ((xOffset + x) * ((maxX - fromEdge) / xSpan()))
        },${
          (maxY - fromEdge) - logScale(y, fromEdge, maxX, maxY)
        }`).join(' ')
      }),
    );
  };
};

const createRatioPolylines = (name, series, startDate) => {
  const fromStart = daysBetween(startDate);
  const entries = Object.entries(series)
    .filter(([ d ]) => fromStart(d) >= 0);
  const xOffset = fromStart(entries[0][0]);
  const points = entries.reduce((t, [, v]) => {
    Object.entries(v)
      .forEach(([ state, [ recent, distant ]]) => {
        if (!t[state]) { t[state] = { recents: [], distants: [] }; }
        t[state].recents.push(recent);
        t[state].distants.push(distant);
      });
    return t;
  }, {});
  return (_, fromEdge = 20, maxX = 400, maxY = 400) => {
    const convert = list => list.map((y, x) => `${
      fromEdge + ((xOffset + x) * ((maxX - fromEdge) / xSpan()))
    },${
      (maxY - fromEdge) - logScale(y, fromEdge, maxX, maxY)
    }`);
    const polylines = [];
    Object.entries(points)
      .forEach(([ state, { recents, distants }]) => {
        const p = convert(recents).concat(convert(distants).reverse());
        polylines.push(
          createNS('polyline', {
            class: `${name} ${state} filled`,
            points: p.join(' ')
          })
        );
      });
    addChild(
      one('#ratio svg'),
      ...polylines,
    );
  };
};

let drawingFns = () => ([]);
const fetchData = async () => {
  await Promise.all([
    fromUsSources(),
    // fromCountrySources()
  ]);
};

const importantDates = [
  [ fmtRealDate(new Date()), 'today' ],

  ['2021-12-01'],
  ['2021-11-01'],
  ['2021-10-01'],
  ['2021-09-01'],
  ['2021-08-01'],
  ['2021-07-01'],
  ['2021-06-01'],
  ['2021-05-01'],
  ['2021-04-01'],
  ['2021-03-01'],
  ['2021-02-01'],
  ['2021-01-01'],
  ['2020-12-01'],
  ['2020-11-01'],
  ['2020-10-01'],
  ['2020-09-01'],
  ['2020-08-01'],
  ['2020-07-01'],
  ['2020-06-01'],
  ['2020-05-01'],
  ['2020-04-01'],
  ['2020-03-01'],
  [ '2020-02-01' ],
];
const renderImportantDates = (startDate) => {
  const fromStart = daysBetween(startDate);
  const points = importantDates
    .filter(([ d ]) => fromStart(d) >= 0)
    .reduce((t, [ k, cls ]) => {
      t.push([ fromStart(k), cls ])
      return t;
    }, []);
  return (_, fromEdge = 20, maxX = 400, maxY = 400) => {
    all('.demo svg')
      .forEach(svg => addChild(
        svg,
        ...(
          points.map(([ x, cls ]) => (
            addChild(
              createNS('g'),
              createNS('line', {
                class: `important-line ${cls ? cls : ''}`,
                x1: fromEdge + (x * ((maxX - fromEdge) / xSpan())),
                x2: fromEdge + (x * ((maxX - fromEdge) / xSpan())),
                y1: 0,
                y2: (maxY - fromEdge)
              }),
              // addChild(
              //   createNS('text', { x: x - 32, y: maxY }),
              //   text(`+${((i + 1) * 14).toString().padStart(3, '0')}`)
              // )
            )
          ))
        )
      ));
  };
};


const stateData = (index, today, list) => Object.values(states).reduce((t, c) => ({
  ...t,
  [c]: index ? today[c] - list[index - 1][1][c] : today[c]
}), {});
const asDeltas = data => {
  const transformed = Object.entries(data)
    .reduce((t, [ date, deets ], i, arr) => {
      t[date] = {
        us: i ? deets.us - arr[i - 1][1].us : deets.us,
        ...stateData(i, deets, arr)
      };
    return t;
    }, {});
  return transformed;
};

document.addEventListener("DOMContentLoaded", async () => {
  "use strict";

  const chart = one('#raw svg');
  const { width, height } = chart.getBoundingClientRect();
  let startDate;
  let showDeltas = false;
  const defaultStart = startDate = '2020-01-21';
  one('input[type="date"]').value = defaultStart;
  one('input[type="date"]').min = defaultStart;
  one('input[type="date"]').addEventListener('change', ({ target }) => {
    if (!target.value) {
      target.value = fmtRealDate(
        new Date(
          (new Date(startDate + ' 12:00 UTC')).getTime() + dayMultiplier
        )
      );
    }
    const now = new Date();
    const yesterday = addDaysTo(now, -1);
    const newStart = strToDate(target.value);
    if (newStart.getTime() > yesterday.getTime()) {
      startDate = fmtRealDate(yesterday);
      target.value = startDate;
    } else if (newStart.getTime() < strToDate(defaultStart).getTime()) {
      startDate = defaultStart;
      target.value = startDate;
    } else {
      startDate = target.value;
    }
    window.dispatchEvent(new Event('resize'));
  });

  createGrid(chart, 16, width, height);

  await fetchData().then(
    () => {
      calculateRatios();
      drawingFns = () => ([
        createGrid,
        renderImportantDates(startDate),
        (...args) => { // totals
          [
            ...(
              Object.entries(data).map(([ name, series ]) => (
                createPolylines('us')(name, series, startDate)
              ))
            ),
            ...(
              Object.values(states).map(c => (
                createPolylines(c)('nyt', data.nyt, startDate)
              ))
            )
          ].forEach(fn => fn(...args));
        },
        (...args) => { // deltas
          if (!showDeltas) { return; }
          [
            ...(
              Object.entries(data).map(([ name, series ]) => (
                createPolylines('us')(name, asDeltas(series), startDate)
              ))
            ),
            ...(
              Object.values(states).map(c => (
                createPolylines(c)('nyt', asDeltas(data.nyt), startDate)
              ))
            )
          ].forEach(fn => fn(...args));
        },
        (...args) => {
          [
            createRatioPolylines('nyt', Ratio.nyt, startDate)
          ].forEach(fn => fn(...args));
        },
      ]);
    }
  );

  window.addEventListener('resize', () => {
    const { width, height } = chart.getBoundingClientRect();
    chart.innerHTML = '';
    drawingFns().forEach(fn => fn(chart, 16, width, height));
  });

  drawingFns().forEach(fn => fn(chart, 16, width, height));

  one('#useLogScale').addEventListener('change', (evt) => {
    useLogScaleY = evt.target.checked;
    window.dispatchEvent(new Event('resize'));
  });
  one('#useLogScale').checked = true;

  one('#deltas').addEventListener('change', (evt) => {
    showDeltas = evt.target.checked;
    window.dispatchEvent(new Event('resize'));
  });
  one('#deltas').checked = false;

  one('#chartoptions').addEventListener('change', ({ target: { value } }) => {
    switch (true) {
      case /^cases$/.test(value):
        one('#ratio').classList.add('hide');
        one('#raw').classList.remove('hide');
        data = Cases;
        break;
      case /^ratio$/.test(value):
        one('#ratio').classList.remove('hide');
        one('#raw').classList.add('hide');
        break;
      default:
        data = Deaths;
        one('#ratio').classList.add('hide');
        one('#raw').classList.remove('hide');
        break;
    }
    window.dispatchEvent(new Event('resize'));
  });

  one('#ySpan').addEventListener('change', (evt) => {
    ySpan = Number(evt.target.value);
    window.dispatchEvent(new Event('resize'));
  });
  one('#ySpan').value = ySpan;

  one('#xSpan').addEventListener('change', (evt) => {
    xMonths = Number(evt.target.value);
    window.dispatchEvent(new Event('resize'));
  });
  one('#xSpan').value = xMonths;

  (() => {
    const target = one('#legend');
    const legendItems = Object.keys(data)
    .reduce((t, source) => ([
      ...t,
      ...(Object.keys(baseObj)
        .reduce((u, st) => ([
          ...u,
          addChild(
            create('div', { class: `${source} ${st}` }),
            text(`${source} ${st}`)
          )
        ]), []))
    ]), []);
    legendItems.forEach(item => {
      item.addEventListener('mouseenter', ({ target }) => {
        all('polyline').forEach(elm => elm.classList.add('dimmer'));
        all(`polyline.${
          Array.from(target.classList).join('.')
        }`).forEach(elm => elm.classList.remove('dimmer'));
      });
      item.addEventListener('mouseleave', ({ target }) => {
        all('polyline.dimmer').forEach(elm => elm.classList.remove('dimmer'));
      });
    });
    addChild(
      target,
      ...(legendItems)
    );
  })();


  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 1000);
});
