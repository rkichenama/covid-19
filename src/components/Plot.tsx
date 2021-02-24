// https://formidable.com/open-source/victory/guides/brush-and-zoom/
import React from 'react';
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryBrushContainer,
  VictoryAxis,
  VictoryLegend
} from 'victory';
import theme from '../data/victory-theme';

import { chartableDiseaseData, monthYear, shortDate } from '../data/transforms';
import { useContainerSize } from '../hooks/dom';

const mock = [
  {
    "date": "2020-03-01",
    "state": "New York",
    "fips": "36",
    "cases": 1,
    "deaths": 0,
    "updated": 1614133631681
  },
  {
    "date": "2020-03-02",
    "state": "New York",
    "fips": "36",
    "cases": 1,
    "deaths": 0,
    "updated": 1614133631681
  },
  {
    "date": "2020-03-03",
    "state": "New York",
    "fips": "36",
    "cases": 2,
    "deaths": 0,
    "updated": 1614133631681
  },
  {
    "date": "2020-03-04",
    "state": "New York",
    "fips": "36",
    "cases": 11,
    "deaths": 0,
    "updated": 1614133631681
  },
  {
    "date": "2020-03-05",
    "state": "New York",
    "fips": "36",
    "cases": 22,
    "deaths": 0,
    "updated": 1614133631681
  },
  {
    "date": "2020-03-06",
    "state": "New York",
    "fips": "36",
    "cases": 44,
    "deaths": 0,
    "updated": 1614133631681
  },
  {
    "date": "2020-03-07",
    "state": "New York",
    "fips": "36",
    "cases": 89,
    "deaths": 0,
    "updated": 1614133631681
  },
  {
    "date": "2020-03-08",
    "state": "New York",
    "fips": "36",
    "cases": 106,
    "deaths": 0,
    "updated": 1614133631681
  },
  {
    "date": "2020-03-09",
    "state": "New York",
    "fips": "36",
    "cases": 142,
    "deaths": 0,
    "updated": 1614133631681
  },
  {
    "date": "2020-03-10",
    "state": "New York",
    "fips": "36",
    "cases": 173,
    "deaths": 0,
    "updated": 1614133631681
  },
  {
    "date": "2020-03-11",
    "state": "New York",
    "fips": "36",
    "cases": 217,
    "deaths": 0,
    "updated": 1614133631681
  },
  {
    "date": "2020-03-12",
    "state": "New York",
    "fips": "36",
    "cases": 326,
    "deaths": 0,
    "updated": 1614133631681
  },
  {
    "date": "2020-03-13",
    "state": "New York",
    "fips": "36",
    "cases": 421,
    "deaths": 0,
    "updated": 1614133631681
  },
  {
    "date": "2020-03-14",
    "state": "New York",
    "fips": "36",
    "cases": 610,
    "deaths": 2,
    "updated": 1614133631681
  },
  {
    "date": "2020-03-15",
    "state": "New York",
    "fips": "36",
    "cases": 732,
    "deaths": 6,
    "updated": 1614133631681
  },
  {
    "date": "2020-03-16",
    "state": "New York",
    "fips": "36",
    "cases": 950,
    "deaths": 10,
    "updated": 1614133631681
  },
  {
    "date": "2020-03-17",
    "state": "New York",
    "fips": "36",
    "cases": 1375,
    "deaths": 18,
    "updated": 1614133631681
  },
  {
    "date": "2020-03-18",
    "state": "New York",
    "fips": "36",
    "cases": 2387,
    "deaths": 32,
    "updated": 1614133631681
  },
  {
    "date": "2020-03-19",
    "state": "New York",
    "fips": "36",
    "cases": 4161,
    "deaths": 39,
    "updated": 1614133631682
  },
  {
    "date": "2020-03-20",
    "state": "New York",
    "fips": "36",
    "cases": 7113,
    "deaths": 68,
    "updated": 1614133631682
  },
  {
    "date": "2020-03-21",
    "state": "New York",
    "fips": "36",
    "cases": 10371,
    "deaths": 95,
    "updated": 1614133631682
  },
  {
    "date": "2020-03-22",
    "state": "New York",
    "fips": "36",
    "cases": 15188,
    "deaths": 142,
    "updated": 1614133631682
  },
  {
    "date": "2020-03-23",
    "state": "New York",
    "fips": "36",
    "cases": 20899,
    "deaths": 183,
    "updated": 1614133631682
  },
  {
    "date": "2020-03-24",
    "state": "New York",
    "fips": "36",
    "cases": 25704,
    "deaths": 264,
    "updated": 1614133631682
  },
  {
    "date": "2020-03-25",
    "state": "New York",
    "fips": "36",
    "cases": 33117,
    "deaths": 381,
    "updated": 1614133631682
  },
  {
    "date": "2020-03-26",
    "state": "New York",
    "fips": "36",
    "cases": 39058,
    "deaths": 502,
    "updated": 1614133631682
  },
  {
    "date": "2020-03-27",
    "state": "New York",
    "fips": "36",
    "cases": 44746,
    "deaths": 645,
    "updated": 1614133631682
  },
  {
    "date": "2020-03-28",
    "state": "New York",
    "fips": "36",
    "cases": 53517,
    "deaths": 935,
    "updated": 1614133631682
  },
  {
    "date": "2020-03-29",
    "state": "New York",
    "fips": "36",
    "cases": 59783,
    "deaths": 1180,
    "updated": 1614133631682
  },
  {
    "date": "2020-03-30",
    "state": "New York",
    "fips": "36",
    "cases": 67504,
    "deaths": 1512,
    "updated": 1614133631682
  },
  {
    "date": "2020-03-31",
    "state": "New York",
    "fips": "36",
    "cases": 76211,
    "deaths": 1929,
    "updated": 1614133631682
  },
  {
    "date": "2020-04-01",
    "state": "New York",
    "fips": "36",
    "cases": 84364,
    "deaths": 2415,
    "updated": 1614133631682
  },
  {
    "date": "2020-04-02",
    "state": "New York",
    "fips": "36",
    "cases": 93360,
    "deaths": 2963,
    "updated": 1614133631682
  },
  {
    "date": "2020-04-03",
    "state": "New York",
    "fips": "36",
    "cases": 103689,
    "deaths": 3716,
    "updated": 1614133631683
  },
  {
    "date": "2020-04-04",
    "state": "New York",
    "fips": "36",
    "cases": 115963,
    "deaths": 4535,
    "updated": 1614133631683
  },
  {
    "date": "2020-04-05",
    "state": "New York",
    "fips": "36",
    "cases": 124085,
    "deaths": 5335,
    "updated": 1614133631683
  },
  {
    "date": "2020-04-06",
    "state": "New York",
    "fips": "36",
    "cases": 133389,
    "deaths": 6149,
    "updated": 1614133631683
  },
  {
    "date": "2020-04-07",
    "state": "New York",
    "fips": "36",
    "cases": 141703,
    "deaths": 7185,
    "updated": 1614133631683
  },
  {
    "date": "2020-04-08",
    "state": "New York",
    "fips": "36",
    "cases": 151271,
    "deaths": 8138,
    "updated": 1614133631683
  },
  {
    "date": "2020-04-09",
    "state": "New York",
    "fips": "36",
    "cases": 162036,
    "deaths": 9166,
    "updated": 1614133631683
  },
  {
    "date": "2020-04-10",
    "state": "New York",
    "fips": "36",
    "cases": 172830,
    "deaths": 10162,
    "updated": 1614133631683
  },
  {
    "date": "2020-04-11",
    "state": "New York",
    "fips": "36",
    "cases": 182990,
    "deaths": 11159,
    "updated": 1614133631683
  },
  {
    "date": "2020-04-12",
    "state": "New York",
    "fips": "36",
    "cases": 191425,
    "deaths": 12116,
    "updated": 1614133631683
  },
  {
    "date": "2020-04-13",
    "state": "New York",
    "fips": "36",
    "cases": 197973,
    "deaths": 12998,
    "updated": 1614133631683
  },
  {
    "date": "2020-04-14",
    "state": "New York",
    "fips": "36",
    "cases": 205375,
    "deaths": 14001,
    "updated": 1614133631683
  },
  {
    "date": "2020-04-15",
    "state": "New York",
    "fips": "36",
    "cases": 217130,
    "deaths": 14937,
    "updated": 1614133631684
  },
  {
    "date": "2020-04-16",
    "state": "New York",
    "fips": "36",
    "cases": 225761,
    "deaths": 15669,
    "updated": 1614133631684
  },
  {
    "date": "2020-04-17",
    "state": "New York",
    "fips": "36",
    "cases": 233293,
    "deaths": 16473,
    "updated": 1614133631684
  },
  {
    "date": "2020-04-18",
    "state": "New York",
    "fips": "36",
    "cases": 240542,
    "deaths": 17141,
    "updated": 1614133631684
  },
  {
    "date": "2020-04-19",
    "state": "New York",
    "fips": "36",
    "cases": 246741,
    "deaths": 17793,
    "updated": 1614133631684
  },
  {
    "date": "2020-04-20",
    "state": "New York",
    "fips": "36",
    "cases": 251608,
    "deaths": 18412,
    "updated": 1614133631684
  },
  {
    "date": "2020-04-21",
    "state": "New York",
    "fips": "36",
    "cases": 255932,
    "deaths": 19040,
    "updated": 1614133631684
  },
  {
    "date": "2020-04-22",
    "state": "New York",
    "fips": "36",
    "cases": 261591,
    "deaths": 19647,
    "updated": 1614133631684
  },
  {
    "date": "2020-04-23",
    "state": "New York",
    "fips": "36",
    "cases": 267932,
    "deaths": 20212,
    "updated": 1614133631684
  },
  {
    "date": "2020-04-24",
    "state": "New York",
    "fips": "36",
    "cases": 276218,
    "deaths": 20759,
    "updated": 1614133631684
  },
  {
    "date": "2020-04-25",
    "state": "New York",
    "fips": "36",
    "cases": 286901,
    "deaths": 21326,
    "updated": 1614133631684
  },
  {
    "date": "2020-04-26",
    "state": "New York",
    "fips": "36",
    "cases": 292914,
    "deaths": 21804,
    "updated": 1614133631684
  },
  {
    "date": "2020-04-27",
    "state": "New York",
    "fips": "36",
    "cases": 296991,
    "deaths": 22267,
    "updated": 1614133631685
  },
  {
    "date": "2020-04-28",
    "state": "New York",
    "fips": "36",
    "cases": 300276,
    "deaths": 22777,
    "updated": 1614133631685
  },
  {
    "date": "2020-04-29",
    "state": "New York",
    "fips": "36",
    "cases": 304994,
    "deaths": 23287,
    "updated": 1614133631685
  },
  {
    "date": "2020-04-30",
    "state": "New York",
    "fips": "36",
    "cases": 309696,
    "deaths": 23616,
    "updated": 1614133631685
  },
  {
    "date": "2020-05-01",
    "state": "New York",
    "fips": "36",
    "cases": 313575,
    "deaths": 23841,
    "updated": 1614133631685
  },
  {
    "date": "2020-05-02",
    "state": "New York",
    "fips": "36",
    "cases": 318134,
    "deaths": 24035,
    "updated": 1614133631685
  },
  {
    "date": "2020-05-03",
    "state": "New York",
    "fips": "36",
    "cases": 321833,
    "deaths": 24576,
    "updated": 1614133631685
  },
  {
    "date": "2020-05-04",
    "state": "New York",
    "fips": "36",
    "cases": 324357,
    "deaths": 24788,
    "updated": 1614133631685
  },
  {
    "date": "2020-05-05",
    "state": "New York",
    "fips": "36",
    "cases": 326659,
    "deaths": 25028,
    "updated": 1614133631685
  },
  {
    "date": "2020-05-06",
    "state": "New York",
    "fips": "36",
    "cases": 329405,
    "deaths": 25956,
    "updated": 1614133631685
  },
  {
    "date": "2020-05-07",
    "state": "New York",
    "fips": "36",
    "cases": 332931,
    "deaths": 26206,
    "updated": 1614133631685
  },
  {
    "date": "2020-05-08",
    "state": "New York",
    "fips": "36",
    "cases": 335804,
    "deaths": 26358,
    "updated": 1614133631685
  },
  {
    "date": "2020-05-09",
    "state": "New York",
    "fips": "36",
    "cases": 338519,
    "deaths": 26584,
    "updated": 1614133631685
  },
  {
    "date": "2020-05-10",
    "state": "New York",
    "fips": "36",
    "cases": 340657,
    "deaths": 26798,
    "updated": 1614133631686
  },
  {
    "date": "2020-05-11",
    "state": "New York",
    "fips": "36",
    "cases": 342267,
    "deaths": 27003,
    "updated": 1614133631686
  },
  {
    "date": "2020-05-12",
    "state": "New York",
    "fips": "36",
    "cases": 343705,
    "deaths": 27282,
    "updated": 1614133631686
  },
  {
    "date": "2020-05-13",
    "state": "New York",
    "fips": "36",
    "cases": 345828,
    "deaths": 27448,
    "updated": 1614133631686
  },
  {
    "date": "2020-05-14",
    "state": "New York",
    "fips": "36",
    "cases": 348192,
    "deaths": 27617,
    "updated": 1614133631686
  },
  {
    "date": "2020-05-15",
    "state": "New York",
    "fips": "36",
    "cases": 350951,
    "deaths": 27755,
    "updated": 1614133631686
  },
  {
    "date": "2020-05-16",
    "state": "New York",
    "fips": "36",
    "cases": 353136,
    "deaths": 27953,
    "updated": 1614133631686
  },
  {
    "date": "2020-05-17",
    "state": "New York",
    "fips": "36",
    "cases": 355037,
    "deaths": 28168,
    "updated": 1614133631686
  },
  {
    "date": "2020-05-18",
    "state": "New York",
    "fips": "36",
    "cases": 356278,
    "deaths": 28302,
    "updated": 1614133631686
  },
  {
    "date": "2020-05-19",
    "state": "New York",
    "fips": "36",
    "cases": 357757,
    "deaths": 28437,
    "updated": 1614133631686
  },
  {
    "date": "2020-05-20",
    "state": "New York",
    "fips": "36",
    "cases": 359235,
    "deaths": 28540,
    "updated": 1614133631687
  },
  {
    "date": "2020-05-21",
    "state": "New York",
    "fips": "36",
    "cases": 361313,
    "deaths": 28663,
    "updated": 1614133631687
  },
  {
    "date": "2020-05-22",
    "state": "New York",
    "fips": "36",
    "cases": 362991,
    "deaths": 28802,
    "updated": 1614133631687
  },
  {
    "date": "2020-05-23",
    "state": "New York",
    "fips": "36",
    "cases": 364745,
    "deaths": 28900,
    "updated": 1614133631687
  },
  {
    "date": "2020-05-24",
    "state": "New York",
    "fips": "36",
    "cases": 366346,
    "deaths": 29046,
    "updated": 1614133631687
  },
  {
    "date": "2020-05-25",
    "state": "New York",
    "fips": "36",
    "cases": 367625,
    "deaths": 29138,
    "updated": 1614133631688
  },
  {
    "date": "2020-05-26",
    "state": "New York",
    "fips": "36",
    "cases": 368669,
    "deaths": 29241,
    "updated": 1614133631688
  },
  {
    "date": "2020-05-27",
    "state": "New York",
    "fips": "36",
    "cases": 369801,
    "deaths": 29339,
    "updated": 1614133631688
  },
  {
    "date": "2020-05-28",
    "state": "New York",
    "fips": "36",
    "cases": 371559,
    "deaths": 29438,
    "updated": 1614133631690
  },
  {
    "date": "2020-05-29",
    "state": "New York",
    "fips": "36",
    "cases": 373108,
    "deaths": 29535,
    "updated": 1614133631690
  },
  {
    "date": "2020-05-30",
    "state": "New York",
    "fips": "36",
    "cases": 374471,
    "deaths": 29612,
    "updated": 1614133631690
  },
  {
    "date": "2020-05-31",
    "state": "New York",
    "fips": "36",
    "cases": 375575,
    "deaths": 29699,
    "updated": 1614133631690
  },
  {
    "date": "2020-06-01",
    "state": "New York",
    "fips": "36",
    "cases": 376520,
    "deaths": 29766,
    "updated": 1614133631690
  },
  {
    "date": "2020-06-02",
    "state": "New York",
    "fips": "36",
    "cases": 377881,
    "deaths": 29847,
    "updated": 1614133631690
  },
  {
    "date": "2020-06-03",
    "state": "New York",
    "fips": "36",
    "cases": 378924,
    "deaths": 29918,
    "updated": 1614133631690
  },
  {
    "date": "2020-06-04",
    "state": "New York",
    "fips": "36",
    "cases": 379977,
    "deaths": 30011,
    "updated": 1614133631690
  },
  {
    "date": "2020-06-05",
    "state": "New York",
    "fips": "36",
    "cases": 381019,
    "deaths": 30066,
    "updated": 1614133631691
  },
  {
    "date": "2020-06-06",
    "state": "New York",
    "fips": "36",
    "cases": 382102,
    "deaths": 30123,
    "updated": 1614133631691
  },
  {
    "date": "2020-06-07",
    "state": "New York",
    "fips": "36",
    "cases": 382879,
    "deaths": 30183,
    "updated": 1614133631691
  },
  {
    "date": "2020-06-08",
    "state": "New York",
    "fips": "36",
    "cases": 383591,
    "deaths": 30239,
    "updated": 1614133631691
  },
  {
    "date": "2020-06-09",
    "state": "New York",
    "fips": "36",
    "cases": 384281,
    "deaths": 30309,
    "updated": 1614133631691
  },
  {
    "date": "2020-06-10",
    "state": "New York",
    "fips": "36",
    "cases": 384945,
    "deaths": 30376,
    "updated": 1614133631691
  },
  {
    "date": "2020-06-11",
    "state": "New York",
    "fips": "36",
    "cases": 385669,
    "deaths": 30431,
    "updated": 1614133631691
  },
  {
    "date": "2020-06-12",
    "state": "New York",
    "fips": "36",
    "cases": 386490,
    "deaths": 30511,
    "updated": 1614133631691
  },
  {
    "date": "2020-06-13",
    "state": "New York",
    "fips": "36",
    "cases": 387402,
    "deaths": 30565,
    "updated": 1614133631691
  },
  {
    "date": "2020-06-14",
    "state": "New York",
    "fips": "36",
    "cases": 388096,
    "deaths": 30605,
    "updated": 1614133631691
  },
  {
    "date": "2020-06-15",
    "state": "New York",
    "fips": "36",
    "cases": 388719,
    "deaths": 30645,
    "updated": 1614133631691
  },
  {
    "date": "2020-06-16",
    "state": "New York",
    "fips": "36",
    "cases": 389349,
    "deaths": 30683,
    "updated": 1614133631691
  },
  {
    "date": "2020-06-17",
    "state": "New York",
    "fips": "36",
    "cases": 389910,
    "deaths": 30722,
    "updated": 1614133631691
  },
  {
    "date": "2020-06-18",
    "state": "New York",
    "fips": "36",
    "cases": 390536,
    "deaths": 30767,
    "updated": 1614133631691
  },
  {
    "date": "2020-06-19",
    "state": "New York",
    "fips": "36",
    "cases": 391330,
    "deaths": 30816,
    "updated": 1614133631691
  },
  {
    "date": "2020-06-20",
    "state": "New York",
    "fips": "36",
    "cases": 392037,
    "deaths": 30839,
    "updated": 1614133631691
  },
  {
    "date": "2020-06-21",
    "state": "New York",
    "fips": "36",
    "cases": 392702,
    "deaths": 30884,
    "updated": 1614133631691
  },
  {
    "date": "2020-06-22",
    "state": "New York",
    "fips": "36",
    "cases": 393257,
    "deaths": 30934,
    "updated": 1614133631691
  },
  {
    "date": "2020-06-23",
    "state": "New York",
    "fips": "36",
    "cases": 393855,
    "deaths": 30970,
    "updated": 1614133631692
  },
  {
    "date": "2020-06-24",
    "state": "New York",
    "fips": "36",
    "cases": 394430,
    "deaths": 31001,
    "updated": 1614133631692
  },
  {
    "date": "2020-06-25",
    "state": "New York",
    "fips": "36",
    "cases": 395168,
    "deaths": 31029,
    "updated": 1614133631692
  },
  {
    "date": "2020-06-26",
    "state": "New York",
    "fips": "36",
    "cases": 395972,
    "deaths": 31075,
    "updated": 1614133631692
  },
  {
    "date": "2020-06-27",
    "state": "New York",
    "fips": "36",
    "cases": 396669,
    "deaths": 31105,
    "updated": 1614133631692
  },
  {
    "date": "2020-06-28",
    "state": "New York",
    "fips": "36",
    "cases": 397293,
    "deaths": 31137,
    "updated": 1614133631692
  },
  {
    "date": "2020-06-29",
    "state": "New York",
    "fips": "36",
    "cases": 397684,
    "deaths": 31143,
    "updated": 1614133631692
  },
  {
    "date": "2020-06-30",
    "state": "New York",
    "fips": "36",
    "cases": 398142,
    "deaths": 31776,
    "updated": 1614133631692
  },
  {
    "date": "2020-07-01",
    "state": "New York",
    "fips": "36",
    "cases": 398770,
    "deaths": 31791,
    "updated": 1614133631692
  },
  {
    "date": "2020-07-02",
    "state": "New York",
    "fips": "36",
    "cases": 399642,
    "deaths": 31814,
    "updated": 1614133631692
  },
  {
    "date": "2020-07-03",
    "state": "New York",
    "fips": "36",
    "cases": 400561,
    "deaths": 31836,
    "updated": 1614133631692
  },
  {
    "date": "2020-07-04",
    "state": "New York",
    "fips": "36",
    "cases": 401286,
    "deaths": 31860,
    "updated": 1614133631692
  },
  {
    "date": "2020-07-05",
    "state": "New York",
    "fips": "36",
    "cases": 401822,
    "deaths": 31895,
    "updated": 1614133631692
  },
  {
    "date": "2020-07-06",
    "state": "New York",
    "fips": "36",
    "cases": 402338,
    "deaths": 31911,
    "updated": 1614133631692
  },
  {
    "date": "2020-07-07",
    "state": "New York",
    "fips": "36",
    "cases": 402928,
    "deaths": 31934,
    "updated": 1614133631692
  },
  {
    "date": "2020-07-08",
    "state": "New York",
    "fips": "36",
    "cases": 403619,
    "deaths": 31945,
    "updated": 1614133631692
  },
  {
    "date": "2020-07-09",
    "state": "New York",
    "fips": "36",
    "cases": 404207,
    "deaths": 31979,
    "updated": 1614133631692
  },
  {
    "date": "2020-07-10",
    "state": "New York",
    "fips": "36",
    "cases": 404997,
    "deaths": 32004,
    "updated": 1614133631692
  },
  {
    "date": "2020-07-11",
    "state": "New York",
    "fips": "36",
    "cases": 405724,
    "deaths": 32019,
    "updated": 1614133631692
  },
  {
    "date": "2020-07-12",
    "state": "New York",
    "fips": "36",
    "cases": 406403,
    "deaths": 32029,
    "updated": 1614133631761
  },
  {
    "date": "2020-07-13",
    "state": "New York",
    "fips": "36",
    "cases": 406962,
    "deaths": 32075,
    "updated": 1614133631761
  },
  {
    "date": "2020-07-14",
    "state": "New York",
    "fips": "36",
    "cases": 407875,
    "deaths": 32092,
    "updated": 1614133631761
  },
  {
    "date": "2020-07-15",
    "state": "New York",
    "fips": "36",
    "cases": 408709,
    "deaths": 32115,
    "updated": 1614133631761
  },
  {
    "date": "2020-07-16",
    "state": "New York",
    "fips": "36",
    "cases": 409476,
    "deaths": 32133,
    "updated": 1614133631762
  },
  {
    "date": "2020-07-17",
    "state": "New York",
    "fips": "36",
    "cases": 410254,
    "deaths": 32147,
    "updated": 1614133631762
  },
  {
    "date": "2020-07-18",
    "state": "New York",
    "fips": "36",
    "cases": 411006,
    "deaths": 32167,
    "updated": 1614133631762
  },
  {
    "date": "2020-07-19",
    "state": "New York",
    "fips": "36",
    "cases": 411515,
    "deaths": 32187,
    "updated": 1614133631762
  },
  {
    "date": "2020-07-20",
    "state": "New York",
    "fips": "36",
    "cases": 412034,
    "deaths": 32203,
    "updated": 1614133631762
  },
  {
    "date": "2020-07-21",
    "state": "New York",
    "fips": "36",
    "cases": 412889,
    "deaths": 32218,
    "updated": 1614133631762
  },
  {
    "date": "2020-07-22",
    "state": "New York",
    "fips": "36",
    "cases": 413595,
    "deaths": 32228,
    "updated": 1614133631762
  },
  {
    "date": "2020-07-23",
    "state": "New York",
    "fips": "36",
    "cases": 414405,
    "deaths": 32270,
    "updated": 1614133631762
  },
  {
    "date": "2020-07-24",
    "state": "New York",
    "fips": "36",
    "cases": 415163,
    "deaths": 32278,
    "updated": 1614133631762
  },
  {
    "date": "2020-07-25",
    "state": "New York",
    "fips": "36",
    "cases": 415911,
    "deaths": 32295,
    "updated": 1614133631762
  },
  {
    "date": "2020-07-26",
    "state": "New York",
    "fips": "36",
    "cases": 416443,
    "deaths": 32305,
    "updated": 1614133631762
  },
  {
    "date": "2020-07-27",
    "state": "New York",
    "fips": "36",
    "cases": 417056,
    "deaths": 32322,
    "updated": 1614133631762
  },
  {
    "date": "2020-07-28",
    "state": "New York",
    "fips": "36",
    "cases": 417591,
    "deaths": 32333,
    "updated": 1614133631762
  },
  {
    "date": "2020-07-29",
    "state": "New York",
    "fips": "36",
    "cases": 418302,
    "deaths": 32342,
    "updated": 1614133631762
  },
  {
    "date": "2020-07-30",
    "state": "New York",
    "fips": "36",
    "cases": 419081,
    "deaths": 32362,
    "updated": 1614133631762
  },
  {
    "date": "2020-07-31",
    "state": "New York",
    "fips": "36",
    "cases": 419723,
    "deaths": 32372,
    "updated": 1614133631762
  },
  {
    "date": "2020-08-01",
    "state": "New York",
    "fips": "36",
    "cases": 420477,
    "deaths": 32390,
    "updated": 1614133631762
  },
  {
    "date": "2020-08-02",
    "state": "New York",
    "fips": "36",
    "cases": 421008,
    "deaths": 32401,
    "updated": 1614133631763
  },
  {
    "date": "2020-08-03",
    "state": "New York",
    "fips": "36",
    "cases": 421550,
    "deaths": 32413,
    "updated": 1614133631763
  },
  {
    "date": "2020-08-04",
    "state": "New York",
    "fips": "36",
    "cases": 422296,
    "deaths": 32422,
    "updated": 1614133631763
  },
  {
    "date": "2020-08-05",
    "state": "New York",
    "fips": "36",
    "cases": 422935,
    "deaths": 32431,
    "updated": 1614133631763
  },
  {
    "date": "2020-08-06",
    "state": "New York",
    "fips": "36",
    "cases": 423629,
    "deaths": 32329,
    "updated": 1614133631763
  },
  {
    "date": "2020-08-07",
    "state": "New York",
    "fips": "36",
    "cases": 424349,
    "deaths": 32336,
    "updated": 1614133631763
  },
  {
    "date": "2020-08-08",
    "state": "New York",
    "fips": "36",
    "cases": 425055,
    "deaths": 32345,
    "updated": 1614133631763
  },
  {
    "date": "2020-08-09",
    "state": "New York",
    "fips": "36",
    "cases": 425568,
    "deaths": 32354,
    "updated": 1614133631763
  },
  {
    "date": "2020-08-10",
    "state": "New York",
    "fips": "36",
    "cases": 426046,
    "deaths": 32361,
    "updated": 1614133631763
  },
  {
    "date": "2020-08-11",
    "state": "New York",
    "fips": "36",
    "cases": 426713,
    "deaths": 32372,
    "updated": 1614133631763
  },
  {
    "date": "2020-08-12",
    "state": "New York",
    "fips": "36",
    "cases": 427419,
    "deaths": 32384,
    "updated": 1614133631763
  },
  {
    "date": "2020-08-13",
    "state": "New York",
    "fips": "36",
    "cases": 428155,
    "deaths": 32399,
    "updated": 1614133631763
  },
  {
    "date": "2020-08-14",
    "state": "New York",
    "fips": "36",
    "cases": 428879,
    "deaths": 32407,
    "updated": 1614133631763
  },
  {
    "date": "2020-08-15",
    "state": "New York",
    "fips": "36",
    "cases": 429617,
    "deaths": 32414,
    "updated": 1614133631763
  },
  {
    "date": "2020-08-16",
    "state": "New York",
    "fips": "36",
    "cases": 430226,
    "deaths": 32424,
    "updated": 1614133631763
  },
  {
    "date": "2020-08-17",
    "state": "New York",
    "fips": "36",
    "cases": 430636,
    "deaths": 32435,
    "updated": 1614133631763
  },
  {
    "date": "2020-08-18",
    "state": "New York",
    "fips": "36",
    "cases": 431298,
    "deaths": 32446,
    "updated": 1614133631763
  },
  {
    "date": "2020-08-19",
    "state": "New York",
    "fips": "36",
    "cases": 431924,
    "deaths": 32451,
    "updated": 1614133631764
  },
  {
    "date": "2020-08-20",
    "state": "New York",
    "fips": "36",
    "cases": 432523,
    "deaths": 32451,
    "updated": 1614133631764
  },
  {
    "date": "2020-08-21",
    "state": "New York",
    "fips": "36",
    "cases": 433230,
    "deaths": 32456,
    "updated": 1614133631764
  },
  {
    "date": "2020-08-22",
    "state": "New York",
    "fips": "36",
    "cases": 433881,
    "deaths": 32464,
    "updated": 1614133631764
  },
  {
    "date": "2020-08-23",
    "state": "New York",
    "fips": "36",
    "cases": 434462,
    "deaths": 32482,
    "updated": 1614133631764
  },
  {
    "date": "2020-08-24",
    "state": "New York",
    "fips": "36",
    "cases": 434866,
    "deaths": 32489,
    "updated": 1614133631764
  },
  {
    "date": "2020-08-25",
    "state": "New York",
    "fips": "36",
    "cases": 435495,
    "deaths": 32495,
    "updated": 1614133631764
  },
  {
    "date": "2020-08-26",
    "state": "New York",
    "fips": "36",
    "cases": 436063,
    "deaths": 32499,
    "updated": 1614133631764
  },
  {
    "date": "2020-08-27",
    "state": "New York",
    "fips": "36",
    "cases": 436852,
    "deaths": 32507,
    "updated": 1614133631764
  },
  {
    "date": "2020-08-28",
    "state": "New York",
    "fips": "36",
    "cases": 437487,
    "deaths": 32515,
    "updated": 1614133631764
  },
  {
    "date": "2020-08-29",
    "state": "New York",
    "fips": "36",
    "cases": 438122,
    "deaths": 32522,
    "updated": 1614133631764
  },
  {
    "date": "2020-08-30",
    "state": "New York",
    "fips": "36",
    "cases": 438831,
    "deaths": 32534,
    "updated": 1614133631764
  },
  {
    "date": "2020-08-31",
    "state": "New York",
    "fips": "36",
    "cases": 439480,
    "deaths": 32541,
    "updated": 1614133631764
  },
  {
    "date": "2020-09-01",
    "state": "New York",
    "fips": "36",
    "cases": 440237,
    "deaths": 32551,
    "updated": 1614133631764
  },
  {
    "date": "2020-09-02",
    "state": "New York",
    "fips": "36",
    "cases": 440947,
    "deaths": 32559,
    "updated": 1614133631764
  },
  {
    "date": "2020-09-03",
    "state": "New York",
    "fips": "36",
    "cases": 441835,
    "deaths": 32567,
    "updated": 1614133631764
  },
  {
    "date": "2020-09-04",
    "state": "New York",
    "fips": "36",
    "cases": 442698,
    "deaths": 32573,
    "updated": 1614133631764
  },
  {
    "date": "2020-09-05",
    "state": "New York",
    "fips": "36",
    "cases": 443497,
    "deaths": 32579,
    "updated": 1614133631765
  },
  {
    "date": "2020-09-06",
    "state": "New York",
    "fips": "36",
    "cases": 444226,
    "deaths": 32585,
    "updated": 1614133631765
  },
  {
    "date": "2020-09-07",
    "state": "New York",
    "fips": "36",
    "cases": 444751,
    "deaths": 32600,
    "updated": 1614133631765
  },
  {
    "date": "2020-09-08",
    "state": "New York",
    "fips": "36",
    "cases": 445308,
    "deaths": 32612,
    "updated": 1614133631765
  },
  {
    "date": "2020-09-09",
    "state": "New York",
    "fips": "36",
    "cases": 445881,
    "deaths": 32611,
    "updated": 1614133631765
  },
  {
    "date": "2020-09-10",
    "state": "New York",
    "fips": "36",
    "cases": 446637,
    "deaths": 32618,
    "updated": 1614133631765
  },
  {
    "date": "2020-09-11",
    "state": "New York",
    "fips": "36",
    "cases": 447498,
    "deaths": 32619,
    "updated": 1614133631765
  },
  {
    "date": "2020-09-12",
    "state": "New York",
    "fips": "36",
    "cases": 448347,
    "deaths": 32625,
    "updated": 1614133631765
  },
  {
    "date": "2020-09-13",
    "state": "New York",
    "fips": "36",
    "cases": 449072,
    "deaths": 32629,
    "updated": 1614133631765
  },
  {
    "date": "2020-09-14",
    "state": "New York",
    "fips": "36",
    "cases": 449658,
    "deaths": 32639,
    "updated": 1614133631765
  },
  {
    "date": "2020-09-15",
    "state": "New York",
    "fips": "36",
    "cases": 450425,
    "deaths": 32655,
    "updated": 1614133631765
  },
  {
    "date": "2020-09-16",
    "state": "New York",
    "fips": "36",
    "cases": 451078,
    "deaths": 32662,
    "updated": 1614133631765
  },
  {
    "date": "2020-09-17",
    "state": "New York",
    "fips": "36",
    "cases": 451971,
    "deaths": 32669,
    "updated": 1614133631765
  },
  {
    "date": "2020-09-18",
    "state": "New York",
    "fips": "36",
    "cases": 452764,
    "deaths": 32682,
    "updated": 1614133631765
  },
  {
    "date": "2020-09-19",
    "state": "New York",
    "fips": "36",
    "cases": 453747,
    "deaths": 32679,
    "updated": 1614133631765
  },
  {
    "date": "2020-09-20",
    "state": "New York",
    "fips": "36",
    "cases": 454612,
    "deaths": 32686,
    "updated": 1614133631765
  },
  {
    "date": "2020-09-21",
    "state": "New York",
    "fips": "36",
    "cases": 455187,
    "deaths": 32691,
    "updated": 1614133631765
  },
  {
    "date": "2020-09-22",
    "state": "New York",
    "fips": "36",
    "cases": 455938,
    "deaths": 32690,
    "updated": 1614133631765
  },
  {
    "date": "2020-09-23",
    "state": "New York",
    "fips": "36",
    "cases": 456604,
    "deaths": 32691,
    "updated": 1614133631766
  },
  {
    "date": "2020-09-24",
    "state": "New York",
    "fips": "36",
    "cases": 457557,
    "deaths": 32696,
    "updated": 1614133631766
  },
  {
    "date": "2020-09-25",
    "state": "New York",
    "fips": "36",
    "cases": 458466,
    "deaths": 32708,
    "updated": 1614133631766
  },
  {
    "date": "2020-09-26",
    "state": "New York",
    "fips": "36",
    "cases": 459472,
    "deaths": 32713,
    "updated": 1614133631766
  },
  {
    "date": "2020-09-27",
    "state": "New York",
    "fips": "36",
    "cases": 460340,
    "deaths": 32722,
    "updated": 1614133631766
  },
  {
    "date": "2020-09-28",
    "state": "New York",
    "fips": "36",
    "cases": 461176,
    "deaths": 32737,
    "updated": 1614133631766
  },
  {
    "date": "2020-09-29",
    "state": "New York",
    "fips": "36",
    "cases": 462364,
    "deaths": 32743,
    "updated": 1614133631766
  },
  {
    "date": "2020-09-30",
    "state": "New York",
    "fips": "36",
    "cases": 463369,
    "deaths": 32757,
    "updated": 1614133631766
  },
  {
    "date": "2020-10-01",
    "state": "New York",
    "fips": "36",
    "cases": 464752,
    "deaths": 32768,
    "updated": 1614133631766
  },
  {
    "date": "2020-10-02",
    "state": "New York",
    "fips": "36",
    "cases": 466353,
    "deaths": 32789,
    "updated": 1614133631766
  },
  {
    "date": "2020-10-03",
    "state": "New York",
    "fips": "36",
    "cases": 468081,
    "deaths": 32794,
    "updated": 1614133631766
  },
  {
    "date": "2020-10-04",
    "state": "New York",
    "fips": "36",
    "cases": 469307,
    "deaths": 32813,
    "updated": 1614133631766
  },
  {
    "date": "2020-10-05",
    "state": "New York",
    "fips": "36",
    "cases": 470244,
    "deaths": 32827,
    "updated": 1614133631766
  },
  {
    "date": "2020-10-06",
    "state": "New York",
    "fips": "36",
    "cases": 471638,
    "deaths": 32836,
    "updated": 1614133631766
  },
  {
    "date": "2020-10-07",
    "state": "New York",
    "fips": "36",
    "cases": 472994,
    "deaths": 32850,
    "updated": 1614133631766
  },
  {
    "date": "2020-10-08",
    "state": "New York",
    "fips": "36",
    "cases": 474829,
    "deaths": 32859,
    "updated": 1614133631766
  },
  {
    "date": "2020-10-09",
    "state": "New York",
    "fips": "36",
    "cases": 476422,
    "deaths": 32867,
    "updated": 1614133631766
  },
  {
    "date": "2020-10-10",
    "state": "New York",
    "fips": "36",
    "cases": 477870,
    "deaths": 32875,
    "updated": 1614133631767
  },
  {
    "date": "2020-10-11",
    "state": "New York",
    "fips": "36",
    "cases": 479013,
    "deaths": 32879,
    "updated": 1614133631767
  },
  {
    "date": "2020-10-12",
    "state": "New York",
    "fips": "36",
    "cases": 480045,
    "deaths": 32896,
    "updated": 1614133631767
  },
  {
    "date": "2020-10-13",
    "state": "New York",
    "fips": "36",
    "cases": 481436,
    "deaths": 32905,
    "updated": 1614133631767
  },
  {
    "date": "2020-10-14",
    "state": "New York",
    "fips": "36",
    "cases": 482671,
    "deaths": 32916,
    "updated": 1614133631767
  },
  {
    "date": "2020-10-15",
    "state": "New York",
    "fips": "36",
    "cases": 484135,
    "deaths": 32935,
    "updated": 1614133631767
  },
  {
    "date": "2020-10-16",
    "state": "New York",
    "fips": "36",
    "cases": 485838,
    "deaths": 32944,
    "updated": 1614133631767
  },
  {
    "date": "2020-10-17",
    "state": "New York",
    "fips": "36",
    "cases": 487626,
    "deaths": 32959,
    "updated": 1614133631767
  },
  {
    "date": "2020-10-18",
    "state": "New York",
    "fips": "36",
    "cases": 489016,
    "deaths": 32972,
    "updated": 1614133631767
  },
  {
    "date": "2020-10-19",
    "state": "New York",
    "fips": "36",
    "cases": 490015,
    "deaths": 32990,
    "updated": 1614133631767
  },
  {
    "date": "2020-10-20",
    "state": "New York",
    "fips": "36",
    "cases": 491216,
    "deaths": 32998,
    "updated": 1614133631767
  },
  {
    "date": "2020-10-21",
    "state": "New York",
    "fips": "36",
    "cases": 493245,
    "deaths": 33005,
    "updated": 1614133631767
  },
  {
    "date": "2020-10-22",
    "state": "New York",
    "fips": "36",
    "cases": 494874,
    "deaths": 33022,
    "updated": 1614133631767
  },
  {
    "date": "2020-10-23",
    "state": "New York",
    "fips": "36",
    "cases": 496510,
    "deaths": 33038,
    "updated": 1614133631767
  },
  {
    "date": "2020-10-24",
    "state": "New York",
    "fips": "36",
    "cases": 498568,
    "deaths": 33049,
    "updated": 1614133631767
  },
  {
    "date": "2020-10-25",
    "state": "New York",
    "fips": "36",
    "cases": 500201,
    "deaths": 33059,
    "updated": 1614133631767
  },
  {
    "date": "2020-10-26",
    "state": "New York",
    "fips": "36",
    "cases": 501393,
    "deaths": 33073,
    "updated": 1614133631767
  },
  {
    "date": "2020-10-27",
    "state": "New York",
    "fips": "36",
    "cases": 503387,
    "deaths": 33092,
    "updated": 1614133631768
  },
  {
    "date": "2020-10-28",
    "state": "New York",
    "fips": "36",
    "cases": 505416,
    "deaths": 33107,
    "updated": 1614133631768
  },
  {
    "date": "2020-10-29",
    "state": "New York",
    "fips": "36",
    "cases": 507913,
    "deaths": 33128,
    "updated": 1614133631768
  },
  {
    "date": "2020-10-30",
    "state": "New York",
    "fips": "36",
    "cases": 510171,
    "deaths": 33143,
    "updated": 1614133631768
  },
  {
    "date": "2020-10-31",
    "state": "New York",
    "fips": "36",
    "cases": 512223,
    "deaths": 33152,
    "updated": 1614133631768
  },
  {
    "date": "2020-11-01",
    "state": "New York",
    "fips": "36",
    "cases": 514482,
    "deaths": 33174,
    "updated": 1614133631768
  },
  {
    "date": "2020-11-02",
    "state": "New York",
    "fips": "36",
    "cases": 516114,
    "deaths": 33187,
    "updated": 1614133631768
  },
  {
    "date": "2020-11-03",
    "state": "New York",
    "fips": "36",
    "cases": 518431,
    "deaths": 33198,
    "updated": 1614133631768
  },
  {
    "date": "2020-11-04",
    "state": "New York",
    "fips": "36",
    "cases": 520557,
    "deaths": 33222,
    "updated": 1614133631768
  },
  {
    "date": "2020-11-05",
    "state": "New York",
    "fips": "36",
    "cases": 523559,
    "deaths": 33247,
    "updated": 1614133631768
  },
  {
    "date": "2020-11-06",
    "state": "New York",
    "fips": "36",
    "cases": 526767,
    "deaths": 33267,
    "updated": 1614133631768
  },
  {
    "date": "2020-11-07",
    "state": "New York",
    "fips": "36",
    "cases": 530354,
    "deaths": 33287,
    "updated": 1614133631768
  },
  {
    "date": "2020-11-08",
    "state": "New York",
    "fips": "36",
    "cases": 533784,
    "deaths": 33314,
    "updated": 1614133631768
  },
  {
    "date": "2020-11-09",
    "state": "New York",
    "fips": "36",
    "cases": 536933,
    "deaths": 33343,
    "updated": 1614133631768
  },
  {
    "date": "2020-11-10",
    "state": "New York",
    "fips": "36",
    "cases": 540897,
    "deaths": 33373,
    "updated": 1614133631768
  },
  {
    "date": "2020-11-11",
    "state": "New York",
    "fips": "36",
    "cases": 545718,
    "deaths": 33398,
    "updated": 1614133631768
  },
  {
    "date": "2020-11-12",
    "state": "New York",
    "fips": "36",
    "cases": 550516,
    "deaths": 33424,
    "updated": 1614133631768
  },
  {
    "date": "2020-11-13",
    "state": "New York",
    "fips": "36",
    "cases": 555917,
    "deaths": 33452,
    "updated": 1614133631769
  },
  {
    "date": "2020-11-14",
    "state": "New York",
    "fips": "36",
    "cases": 561308,
    "deaths": 33477,
    "updated": 1614133631769
  },
  {
    "date": "2020-11-15",
    "state": "New York",
    "fips": "36",
    "cases": 564952,
    "deaths": 33508,
    "updated": 1614133631769
  },
  {
    "date": "2020-11-16",
    "state": "New York",
    "fips": "36",
    "cases": 568450,
    "deaths": 33540,
    "updated": 1614133631769
  },
  {
    "date": "2020-11-17",
    "state": "New York",
    "fips": "36",
    "cases": 573544,
    "deaths": 33576,
    "updated": 1614133631769
  },
  {
    "date": "2020-11-18",
    "state": "New York",
    "fips": "36",
    "cases": 578826,
    "deaths": 33607,
    "updated": 1614133631769
  },
  {
    "date": "2020-11-19",
    "state": "New York",
    "fips": "36",
    "cases": 584128,
    "deaths": 33648,
    "updated": 1614133631769
  },
  {
    "date": "2020-11-20",
    "state": "New York",
    "fips": "36",
    "cases": 589605,
    "deaths": 33696,
    "updated": 1614133631769
  },
  {
    "date": "2020-11-21",
    "state": "New York",
    "fips": "36",
    "cases": 595581,
    "deaths": 33737,
    "updated": 1614133631769
  },
  {
    "date": "2020-11-22",
    "state": "New York",
    "fips": "36",
    "cases": 600967,
    "deaths": 33767,
    "updated": 1614133631769
  },
  {
    "date": "2020-11-23",
    "state": "New York",
    "fips": "36",
    "cases": 606878,
    "deaths": 33804,
    "updated": 1614133631769
  },
  {
    "date": "2020-11-24",
    "state": "New York",
    "fips": "36",
    "cases": 611756,
    "deaths": 33847,
    "updated": 1614133631769
  },
  {
    "date": "2020-11-25",
    "state": "New York",
    "fips": "36",
    "cases": 618023,
    "deaths": 33890,
    "updated": 1614133631769
  },
  {
    "date": "2020-11-26",
    "state": "New York",
    "fips": "36",
    "cases": 624961,
    "deaths": 33959,
    "updated": 1614133631769
  },
  {
    "date": "2020-11-27",
    "state": "New York",
    "fips": "36",
    "cases": 633140,
    "deaths": 34004,
    "updated": 1614133631769
  },
  {
    "date": "2020-11-28",
    "state": "New York",
    "fips": "36",
    "cases": 639200,
    "deaths": 34049,
    "updated": 1614133631769
  },
  {
    "date": "2020-11-29",
    "state": "New York",
    "fips": "36",
    "cases": 645932,
    "deaths": 34101,
    "updated": 1614133631769
  },
  {
    "date": "2020-11-30",
    "state": "New York",
    "fips": "36",
    "cases": 652748,
    "deaths": 34150,
    "updated": 1614133631769
  },
  {
    "date": "2020-12-01",
    "state": "New York",
    "fips": "36",
    "cases": 660041,
    "deaths": 34222,
    "updated": 1614133631770
  },
  {
    "date": "2020-12-02",
    "state": "New York",
    "fips": "36",
    "cases": 669016,
    "deaths": 34286,
    "updated": 1614133631770
  },
  {
    "date": "2020-12-03",
    "state": "New York",
    "fips": "36",
    "cases": 678869,
    "deaths": 34346,
    "updated": 1614133631770
  },
  {
    "date": "2020-12-04",
    "state": "New York",
    "fips": "36",
    "cases": 690143,
    "deaths": 34409,
    "updated": 1614133631770
  },
  {
    "date": "2020-12-05",
    "state": "New York",
    "fips": "36",
    "cases": 700902,
    "deaths": 34488,
    "updated": 1614133631770
  },
  {
    "date": "2020-12-06",
    "state": "New York",
    "fips": "36",
    "cases": 710612,
    "deaths": 34552,
    "updated": 1614133631770
  },
  {
    "date": "2020-12-07",
    "state": "New York",
    "fips": "36",
    "cases": 718991,
    "deaths": 34637,
    "updated": 1614133631770
  },
  {
    "date": "2020-12-08",
    "state": "New York",
    "fips": "36",
    "cases": 728010,
    "deaths": 34723,
    "updated": 1614133631770
  },
  {
    "date": "2020-12-09",
    "state": "New York",
    "fips": "36",
    "cases": 738947,
    "deaths": 34799,
    "updated": 1614133631770
  },
  {
    "date": "2020-12-10",
    "state": "New York",
    "fips": "36",
    "cases": 749204,
    "deaths": 34884,
    "updated": 1614133631770
  },
  {
    "date": "2020-12-11",
    "state": "New York",
    "fips": "36",
    "cases": 759765,
    "deaths": 34983,
    "updated": 1614133631770
  },
  {
    "date": "2020-12-12",
    "state": "New York",
    "fips": "36",
    "cases": 770804,
    "deaths": 35074,
    "updated": 1614133631770
  },
  {
    "date": "2020-12-13",
    "state": "New York",
    "fips": "36",
    "cases": 780831,
    "deaths": 35198,
    "updated": 1614133631770
  },
  {
    "date": "2020-12-14",
    "state": "New York",
    "fips": "36",
    "cases": 789815,
    "deaths": 35288,
    "updated": 1614133631770
  },
  {
    "date": "2020-12-15",
    "state": "New York",
    "fips": "36",
    "cases": 799551,
    "deaths": 35425,
    "updated": 1614133631770
  },
  {
    "date": "2020-12-16",
    "state": "New York",
    "fips": "36",
    "cases": 808929,
    "deaths": 35522,
    "updated": 1614133631770
  },
  {
    "date": "2020-12-17",
    "state": "New York",
    "fips": "36",
    "cases": 819427,
    "deaths": 35647,
    "updated": 1614133631770
  },
  {
    "date": "2020-12-18",
    "state": "New York",
    "fips": "36",
    "cases": 832033,
    "deaths": 35775,
    "updated": 1614133631771
  },
  {
    "date": "2020-12-19",
    "state": "New York",
    "fips": "36",
    "cases": 841946,
    "deaths": 35897,
    "updated": 1614133631771
  },
  {
    "date": "2020-12-20",
    "state": "New York",
    "fips": "36",
    "cases": 851400,
    "deaths": 36017,
    "updated": 1614133631771
  },
  {
    "date": "2020-12-21",
    "state": "New York",
    "fips": "36",
    "cases": 860856,
    "deaths": 36147,
    "updated": 1614133631771
  },
  {
    "date": "2020-12-22",
    "state": "New York",
    "fips": "36",
    "cases": 871155,
    "deaths": 36300,
    "updated": 1614133631771
  },
  {
    "date": "2020-12-23",
    "state": "New York",
    "fips": "36",
    "cases": 882895,
    "deaths": 36454,
    "updated": 1614133631771
  },
  {
    "date": "2020-12-24",
    "state": "New York",
    "fips": "36",
    "cases": 896242,
    "deaths": 36604,
    "updated": 1614133631771
  },
  {
    "date": "2020-12-25",
    "state": "New York",
    "fips": "36",
    "cases": 909123,
    "deaths": 36739,
    "updated": 1614133631771
  },
  {
    "date": "2020-12-26",
    "state": "New York",
    "fips": "36",
    "cases": 920171,
    "deaths": 36870,
    "updated": 1614133631774
  },
  {
    "date": "2020-12-27",
    "state": "New York",
    "fips": "36",
    "cases": 928376,
    "deaths": 37000,
    "updated": 1614133631774
  },
  {
    "date": "2020-12-28",
    "state": "New York",
    "fips": "36",
    "cases": 938710,
    "deaths": 37118,
    "updated": 1614133631774
  },
  {
    "date": "2020-12-29",
    "state": "New York",
    "fips": "36",
    "cases": 950730,
    "deaths": 37256,
    "updated": 1614133631774
  },
  {
    "date": "2020-12-30",
    "state": "New York",
    "fips": "36",
    "cases": 963647,
    "deaths": 37412,
    "updated": 1614133631774
  },
  {
    "date": "2020-12-31",
    "state": "New York",
    "fips": "36",
    "cases": 979040,
    "deaths": 37557,
    "updated": 1614133631774
  },
  {
    "date": "2021-01-01",
    "state": "New York",
    "fips": "36",
    "cases": 996073,
    "deaths": 37733,
    "updated": 1614133631774
  },
  {
    "date": "2021-01-02",
    "state": "New York",
    "fips": "36",
    "cases": 1011922,
    "deaths": 37854,
    "updated": 1614133631774
  },
  {
    "date": "2021-01-03",
    "state": "New York",
    "fips": "36",
    "cases": 1024154,
    "deaths": 38001,
    "updated": 1614133631774
  },
  {
    "date": "2021-01-04",
    "state": "New York",
    "fips": "36",
    "cases": 1035396,
    "deaths": 38167,
    "updated": 1614133631774
  },
  {
    "date": "2021-01-05",
    "state": "New York",
    "fips": "36",
    "cases": 1048538,
    "deaths": 38315,
    "updated": 1614133631774
  },
  {
    "date": "2021-01-06",
    "state": "New York",
    "fips": "36",
    "cases": 1064554,
    "deaths": 38486,
    "updated": 1614133631774
  },
  {
    "date": "2021-01-07",
    "state": "New York",
    "fips": "36",
    "cases": 1082142,
    "deaths": 38683,
    "updated": 1614133631774
  },
  {
    "date": "2021-01-08",
    "state": "New York",
    "fips": "36",
    "cases": 1101702,
    "deaths": 38846,
    "updated": 1614133631774
  },
  {
    "date": "2021-01-09",
    "state": "New York",
    "fips": "36",
    "cases": 1119541,
    "deaths": 39041,
    "updated": 1614133631775
  },
  {
    "date": "2021-01-10",
    "state": "New York",
    "fips": "36",
    "cases": 1135849,
    "deaths": 39208,
    "updated": 1614133631775
  },
  {
    "date": "2021-01-11",
    "state": "New York",
    "fips": "36",
    "cases": 1150028,
    "deaths": 39404,
    "updated": 1614133631775
  },
  {
    "date": "2021-01-12",
    "state": "New York",
    "fips": "36",
    "cases": 1164819,
    "deaths": 39588,
    "updated": 1614133631775
  },
  {
    "date": "2021-01-13",
    "state": "New York",
    "fips": "36",
    "cases": 1179523,
    "deaths": 39760,
    "updated": 1614133631775
  },
  {
    "date": "2021-01-14",
    "state": "New York",
    "fips": "36",
    "cases": 1193710,
    "deaths": 39997,
    "updated": 1614133631775
  },
  {
    "date": "2021-01-15",
    "state": "New York",
    "fips": "36",
    "cases": 1213179,
    "deaths": 40203,
    "updated": 1614133631775
  },
  {
    "date": "2021-01-16",
    "state": "New York",
    "fips": "36",
    "cases": 1229124,
    "deaths": 40376,
    "updated": 1614133631775
  },
  {
    "date": "2021-01-17",
    "state": "New York",
    "fips": "36",
    "cases": 1242818,
    "deaths": 40570,
    "updated": 1614133631775
  },
  {
    "date": "2021-01-18",
    "state": "New York",
    "fips": "36",
    "cases": 1256228,
    "deaths": 40753,
    "updated": 1614133631775
  },
  {
    "date": "2021-01-19",
    "state": "New York",
    "fips": "36",
    "cases": 1268949,
    "deaths": 40933,
    "updated": 1614133631775
  },
  {
    "date": "2021-01-20",
    "state": "New York",
    "fips": "36",
    "cases": 1280068,
    "deaths": 41148,
    "updated": 1614133631775
  },
  {
    "date": "2021-01-21",
    "state": "New York",
    "fips": "36",
    "cases": 1293976,
    "deaths": 41348,
    "updated": 1614133631775
  },
  {
    "date": "2021-01-22",
    "state": "New York",
    "fips": "36",
    "cases": 1309660,
    "deaths": 41530,
    "updated": 1614133631775
  },
  {
    "date": "2021-01-23",
    "state": "New York",
    "fips": "36",
    "cases": 1323569,
    "deaths": 41694,
    "updated": 1614133631775
  },
  {
    "date": "2021-01-24",
    "state": "New York",
    "fips": "36",
    "cases": 1335952,
    "deaths": 41889,
    "updated": 1614133631775
  },
  {
    "date": "2021-01-25",
    "state": "New York",
    "fips": "36",
    "cases": 1347924,
    "deaths": 42090,
    "updated": 1614133631775
  },
  {
    "date": "2021-01-26",
    "state": "New York",
    "fips": "36",
    "cases": 1358964,
    "deaths": 42273,
    "updated": 1614133631775
  },
  {
    "date": "2021-01-27",
    "state": "New York",
    "fips": "36",
    "cases": 1369329,
    "deaths": 42434,
    "updated": 1614133631776
  },
  {
    "date": "2021-01-28",
    "state": "New York",
    "fips": "36",
    "cases": 1383112,
    "deaths": 42639,
    "updated": 1614133631776
  },
  {
    "date": "2021-01-29",
    "state": "New York",
    "fips": "36",
    "cases": 1396063,
    "deaths": 42825,
    "updated": 1614133631776
  },
  {
    "date": "2021-01-30",
    "state": "New York",
    "fips": "36",
    "cases": 1408955,
    "deaths": 42996,
    "updated": 1614133631776
  },
  {
    "date": "2021-01-31",
    "state": "New York",
    "fips": "36",
    "cases": 1420164,
    "deaths": 43178,
    "updated": 1614133631776
  },
  {
    "date": "2021-02-01",
    "state": "New York",
    "fips": "36",
    "cases": 1429096,
    "deaths": 43354,
    "updated": 1614133631776
  },
  {
    "date": "2021-02-02",
    "state": "New York",
    "fips": "36",
    "cases": 1437045,
    "deaths": 43524,
    "updated": 1614133631776
  },
  {
    "date": "2021-02-03",
    "state": "New York",
    "fips": "36",
    "cases": 1444199,
    "deaths": 43687,
    "updated": 1614133631776
  },
  {
    "date": "2021-02-04",
    "state": "New York",
    "fips": "36",
    "cases": 1451169,
    "deaths": 43842,
    "updated": 1614133631776
  },
  {
    "date": "2021-02-05",
    "state": "New York",
    "fips": "36",
    "cases": 1459066,
    "deaths": 44012,
    "updated": 1614133631776
  },
  {
    "date": "2021-02-06",
    "state": "New York",
    "fips": "36",
    "cases": 1470558,
    "deaths": 44210,
    "updated": 1614133631776
  },
  {
    "date": "2021-02-07",
    "state": "New York",
    "fips": "36",
    "cases": 1480481,
    "deaths": 44387,
    "updated": 1614133631776
  },
  {
    "date": "2021-02-08",
    "state": "New York",
    "fips": "36",
    "cases": 1489453,
    "deaths": 44512,
    "updated": 1614133631776
  },
  {
    "date": "2021-02-09",
    "state": "New York",
    "fips": "36",
    "cases": 1497732,
    "deaths": 44683,
    "updated": 1614133631776
  },
  {
    "date": "2021-02-10",
    "state": "New York",
    "fips": "36",
    "cases": 1504316,
    "deaths": 44851,
    "updated": 1614133631776
  },
  {
    "date": "2021-02-11",
    "state": "New York",
    "fips": "36",
    "cases": 1514327,
    "deaths": 44992,
    "updated": 1614133631776
  },
  {
    "date": "2021-02-12",
    "state": "New York",
    "fips": "36",
    "cases": 1523042,
    "deaths": 45138,
    "updated": 1614133631776
  },
  {
    "date": "2021-02-13",
    "state": "New York",
    "fips": "36",
    "cases": 1531797,
    "deaths": 45295,
    "updated": 1614133631776
  },
  {
    "date": "2021-02-14",
    "state": "New York",
    "fips": "36",
    "cases": 1540127,
    "deaths": 45431,
    "updated": 1614133631776
  },
  {
    "date": "2021-02-15",
    "state": "New York",
    "fips": "36",
    "cases": 1546665,
    "deaths": 45552,
    "updated": 1614133631776
  },
  {
    "date": "2021-02-16",
    "state": "New York",
    "fips": "36",
    "cases": 1553374,
    "deaths": 45683,
    "updated": 1614133631777
  },
  {
    "date": "2021-02-17",
    "state": "New York",
    "fips": "36",
    "cases": 1559299,
    "deaths": 45807,
    "updated": 1614133631777
  },
  {
    "date": "2021-02-18",
    "state": "New York",
    "fips": "36",
    "cases": 1568881,
    "deaths": 45957,
    "updated": 1614133631777
  },
  {
    "date": "2021-02-19",
    "state": "New York",
    "fips": "36",
    "cases": 1577454,
    "deaths": 46119,
    "updated": 1614133631777
  },
  {
    "date": "2021-02-20",
    "state": "New York",
    "fips": "36",
    "cases": 1585692,
    "deaths": 46233,
    "updated": 1614133631777
  },
  {
    "date": "2021-02-21",
    "state": "New York",
    "fips": "36",
    "cases": 1591929,
    "deaths": 46346,
    "updated": 1614133631777
  },
  {
    "date": "2021-02-22",
    "state": "New York",
    "fips": "36",
    "cases": 1598226,
    "deaths": 46454,
    "updated": 1614133631780
  }
];

interface DataSet {
  name: string,
  data: ChartableData[]
}

interface PlotProps {
  datasets?: DataSet[]
}

const Plot: React.FC<PlotProps> = ({
  datasets = [
    { name: 'New York', data: chartableDiseaseData(mock as unknown as DiseasesData[])('deaths') }
  ] as DataSet[]
}) => {
  const [ state, setState ] = React.useState({} as any);
  const ref = React.useRef(undefined as HTMLDivElement);
  const { width, height } = useContainerSize(ref);
  const handleZoom = (domain) => {
    setState({...state, selectedDomain: domain});
  };
  const handleBrush = (domain) => {
    setState({...state, zoomDomain: domain});
  };

  const data = chartableDiseaseData(mock as unknown as DiseasesData[])('deaths');

  return (
    <div className='x1 y1 w12 h12' {...{ ref }}>
      <VictoryChart {...{ theme }}
        width={width}
        height={height - 90}
        scale={{ x: 'time', y: 'linear' }}
        // padding={{ top: 3 }}
        domainPadding={{ x: [0, 0], y: [0, 90] }}
        containerComponent={
          <VictoryZoomContainer {...{ theme }}
            responsive={false}
            zoomDimension='x'
            zoomDomain={state.zoomDomain}
            onZoomDomainChange={handleZoom}
          />
        }
      >
        <VictoryLegend {...{ theme }} x={125} y={10}
          centerTitle
          orientation="horizontal"
          gutter={20}
          // style={{ border: { stroke: "black" }, title: {fontSize: 20 } }}
          data={[
            { name: "NYS", symbol: { fill: 'cyan' } }
          ]}
        />
        <VictoryAxis {...{ theme }}
          tickFormat={(x) => shortDate(x)}
          tickCount={6}
        />
        <VictoryAxis {...{ theme }} dependentAxis
          tickCount={5}
          tickFormat={(t) => t.toPrecision(1)}
        />
        {
          datasets.map(({ name, data }) => (
            <VictoryLine key={name} {...{ theme }}
              style={{
                data: { stroke: 'cyan' },
              }}
              data={data}
            />
          ))
        }
      </VictoryChart>
      {/* mini */}
      <VictoryChart {...{ theme }}
        width={width}
        height={90}
        scale={{ x: 'time', y: 'log' }}
        padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
        containerComponent={
          <VictoryBrushContainer {...{ theme }}
            responsive={false}
            brushDimension="x"
            brushDomain={state.selectedDomain}
            onBrushDomainChange={handleBrush}
          />
        }
      >
        <VictoryAxis {...{ theme }}
          tickFormat={(x) => monthYear(x)}
        />
        {
          datasets.map(({ name, data }) => (
            <VictoryLine key={name} {...{ theme }}
              style={{
                data: { stroke: 'darkcyan' },
              }}
              data={data}
            />
          ))
        }
      </VictoryChart>
    </div>
  );
};

export default Plot;
