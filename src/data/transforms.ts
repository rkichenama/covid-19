import { parseISO } from 'date-fns';
import sortBy from 'lodash/sortBy';

export const chartableDiseaseData = (list: DiseasesData[]) => (field: ('cases' | 'deaths')) => {
  return sortBy<ChartableData[]>(
    list.map(({ date, [field]: value }) => ({ x: parseISO(date), y: value })),
    [ ({ x }: ChartableData) => x ]
  );
};

const DateFormats = {
  longDate: { year: 'numeric', month: 'long', day: 'numeric' },
  shortDate: { year: '2-digit', month: '2-digit', day: '2-digit' },
  monthYear: { year: 'numeric', month: 'short' },
} as Record<string, Intl.DateTimeFormatOptions>;
const asDate = (date: string | Date) => (
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
export const shortDate = (date: string | Date) => (
  asLocaleString(asDate(date))(DateFormats.shortDate)
);
export const monthYear = (date: string | Date) => (
  asLocaleString(asDate(date))(DateFormats.monthYear)
);
