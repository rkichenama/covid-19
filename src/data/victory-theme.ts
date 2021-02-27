import { assign } from 'lodash';

// *
// * Colors
// *
export const yellow200 = '#FFF59D';
export const deepOrange600 = '#F4511E';
export const lime300 = '#DCE775';
export const lightGreen500 = '#8BC34A';
export const teal700 = '#00796B';
export const cyan900 = '#006064';
export const colors = [
  deepOrange600, yellow200, lime300, lightGreen500, teal700, cyan900
];
export const blueGrey50 = '#808080';
export const blueGrey300 = '#acacac';
export const blueGrey700 = '#ffffff';
// const blueGrey50 = '#ECEFF1';
// const blueGrey300 = '#90A4AE';
// const blueGrey700 = '#455A64';
export const grey900 = '#131313';
// const grey900 = '#212121';
// *
// * Typography
// *
export const sansSerif = `'Helvetica Neue', 'Helvetica', sans-serif`;
export const letterSpacing = 'normal';
export const fontSize = 14;
// const fontSize = 12;
// *
// * Layout
// *
export const padding = 8;
export const baseProps = {
  width: 360,
  height: 360,
  // padding: 50
  padding: {
    top: 48, bottom: 48, left: 48, right: 48
  }
};
// *
// * Labels
// *
export const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding,
  fill: blueGrey700,
  stroke: 'transparent',
  strokeWidth: 0
};

export const centeredLabelStyles = assign({ textAnchor: 'middle' }, baseLabelStyles);
// *
// * Strokes
// *
export const strokeDasharray = '10, 5';
export const strokeLinecap = 'round';
export const strokeLinejoin = 'round';

export default {
  area: assign(
    {
      style: {
        data: {
          fill: grey900
        },
        labels: baseLabelStyles
      }
    },
    baseProps
  ),
  axis: assign(
    {
      style: {
        axis: {
          fill: 'transparent',
          stroke: blueGrey300,
          strokeWidth: 2,
          strokeLinecap,
          strokeLinejoin
        },
        axisLabel: assign({}, centeredLabelStyles, {
          padding,
          stroke: 'transparent'
        }),
        grid: {
          fill: 'none',
          stroke: blueGrey50,
          strokeDasharray,
          strokeLinecap,
          strokeLinejoin,
          pointerEvents: 'painted'
        },
        ticks: {
          fill: 'transparent',
          size: 5,
          stroke: blueGrey300,
          strokeWidth: 1,
          strokeLinecap,
          strokeLinejoin
        },
        tickLabels: assign({}, baseLabelStyles, {
          fill: blueGrey700
        })
      }
    },
    baseProps
  ),
  polarDependentAxis: assign({
    style: {
      ticks: {
        fill: 'transparent',
        size: 1,
        stroke: 'transparent'
      }
    }
  }),
  bar: assign(
    {
      style: {
        data: {
          fill: blueGrey700,
          padding,
          strokeWidth: 0
        },
        labels: baseLabelStyles
      }
    },
    baseProps
  ),
  boxplot: assign(
    {
      style: {
        max: { padding, stroke: blueGrey700, strokeWidth: 1 },
        maxLabels: assign({}, baseLabelStyles, { padding: 3 }),
        median: { padding, stroke: blueGrey700, strokeWidth: 1 },
        medianLabels: assign({}, baseLabelStyles, { padding: 3 }),
        min: { padding, stroke: blueGrey700, strokeWidth: 1 },
        minLabels: assign({}, baseLabelStyles, { padding: 3 }),
        q1: { padding, fill: blueGrey700 },
        q1Labels: assign({}, baseLabelStyles, { padding: 3 }),
        q3: { padding, fill: blueGrey700 },
        q3Labels: assign({}, baseLabelStyles, { padding: 3 })
      },
      boxWidth: 20
    },
    baseProps
  ),
  candlestick: assign(
    {
      style: {
        data: {
          stroke: blueGrey700
        },
        labels: assign({}, baseLabelStyles, { padding: 5 })
      },
      candleColors: {
        positive: '#ffffff',
        negative: blueGrey700
      }
    },
    baseProps
  ),
  chart: baseProps,
  errorbar: assign(
    {
      borderWidth: 8,
      style: {
        data: {
          fill: 'transparent',
          opacity: 1,
          stroke: blueGrey700,
          strokeWidth: 2
        },
        labels: baseLabelStyles
      }
    },
    baseProps
  ),
  group: assign(
    {
      colorScale: colors
    },
    baseProps
  ),
  histogram: assign(
    {
      style: {
        data: {
          fill: blueGrey700,
          stroke: grey900,
          strokeWidth: 2
        },
        labels: baseLabelStyles
      }
    },
    baseProps
  ),
  legend: {
    colorScale: colors,
    gutter: 10,
    orientation: 'vertical',
    titleOrientation: 'top',
    style: {
      data: {
        type: 'circle'
      },
      labels: baseLabelStyles,
      title: assign({}, baseLabelStyles, { padding: 5 })
    }
  },
  line: assign(
    {
      style: {
        data: {
          fill: 'transparent',
          opacity: 1,
          stroke: blueGrey700,
          strokeWidth: 2
        },
        labels: baseLabelStyles
      }
    },
    baseProps
  ),
  pie: assign(
    {
      colorScale: colors,
      style: {
        data: {
          padding,
          stroke: blueGrey50,
          strokeWidth: 1
        },
        labels: assign({}, baseLabelStyles, { padding: 20 })
      }
    },
    baseProps
  ),
  scatter: assign(
    {
      style: {
        data: {
          fill: blueGrey700,
          opacity: 1,
          stroke: 'transparent',
          strokeWidth: 0
        },
        labels: baseLabelStyles
      }
    },
    baseProps
  ),
  stack: assign(
    {
      colorScale: colors
    },
    baseProps
  ),
  tooltip: {
    style: assign({}, baseLabelStyles, { padding: 0, pointerEvents: 'none' }),
    flyoutStyle: {
      stroke: grey900,
      strokeWidth: 1,
      fill: '#f0f0f0',
      pointerEvents: 'none'
    },
    flyoutPadding: 5,
    cornerRadius: 5,
    pointerLength: 10
  },
  voronoi: assign(
    {
      style: {
        data: {
          fill: 'transparent',
          stroke: 'transparent',
          strokeWidth: 0
        },
        labels: assign({}, baseLabelStyles, {
          padding: 5, pointerEvents: 'none',
          fill: grey900
        }),
        flyout: {
          stroke: grey900,
          strokeWidth: 1,
          fill: '#f0f0f0',
          pointerEvents: 'none'
        }
      }
    },
    baseProps
  )
};
