import { parseISO, parse } from 'date-fns';
import sortBy from 'lodash/sortBy';

export const chartableDiseaseData = (list: DiseasesData[] = []) => (field: ('cases' | 'deaths'), useDelta: boolean = false) => {
  return sortBy<ChartableData[]>(
    list.map(({ date, [field]: value }, index, arr) => ({
      x: parseISO(date),
      y: useDelta
        ? !index ? value : value - (arr[index - 1][field] || 0)
        : value
    })),
    [ ({ x }: ChartableData) => x ]
  ) as ChartableData[];
};

// https://www1.nyc.gov/site/doh/covid/covid-19-vaccine-facts.page
const doses = [
  2, // Pfizer
  2, // Moderna
  1, // Johnson & Johnson
];
const dosesPerPerson = doses.reduce((t, c) => t + c, 0) / doses.length;
const parseDate = (str: string) => parse(str, 'MM/dd/yy', new Date());
export const chartableVaccineData = (list: Record<string, number> = {}) => {
  return sortBy<ChartableData[]>(
    Object.entries(list).map(([ key, value ]) => ({ x: parseDate(key), y: (value / dosesPerPerson) | 0 })),
    [ ({ x }: ChartableData) => x ]
  ) as ChartableData[];
};

const DateFormats = {
  longDate: { year: 'numeric', month: 'long', day: 'numeric' },
  mediumDate: { year: '2-digit', month: 'short', day: '2-digit' },
  shortDate: { year: '2-digit', month: '2-digit', day: '2-digit' },
  monthYear: { year: 'numeric', month: 'short' },
} as Record<string, Intl.DateTimeFormatOptions>;
export const asDate = (date: string | Date) => (
  date instanceof Date
    ? date
    : parseISO(date)
);
const asLocaleString = (date: Date) => (opts: Intl.DateTimeFormatOptions) => (
  date.toLocaleDateString(undefined, opts)
);
export const longDate = (date: string | Date) => (
  asLocaleString(asDate(date))(DateFormats.longDate)
);
export const mediumDate = (date: string | Date) => (
  asLocaleString(asDate(date))(DateFormats.mediumDate)
);
export const shortDate = (date: string | Date) => (
  asLocaleString(asDate(date))(DateFormats.shortDate)
);
export const monthYear = (date: string | Date) => (
  asLocaleString(asDate(date))(DateFormats.monthYear)
);

export const compactNumber = (n: number) => (
  n.toLocaleString(undefined, { notation: 'compact' })
);
export const formattedNumber = (n: number) => (
  // @ts-ignore
  n.toLocaleString(undefined, { useGrouping: true, maximumFractionDigits: 0, roundingMode: 'floor' })
);